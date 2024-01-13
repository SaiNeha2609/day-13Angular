import { Component, OnInit } from '@angular/core';
import { Patient } from './patient';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Array<Patient> = [];
  isAdmin: boolean = false;
  username: string = '';
  newPatient: Patient = new Patient();
  updatedPatient: Patient = new Patient();
  filterById: number | any;
  filterByName: string = '';
  filterByDoc: string = '';
  filterByStage: string = '';
  id:any;
  pp:any;

  constructor(private patientService: PatientService) {
  }

  ngOnInit(){
    this.loadPatients();
  }

  checkUser(){
      this.isAdmin=this.username==='admin';
    
  }

     loadPatients() {
       this.patientService.getAllPatients().subscribe((data) => {
         this.patients = data;
       },
       error =>{
        console.log(error);
       });
     }

     submitPatient() {
       if (this.isAdmin) {
         this.patientService.addPatient(this.newPatient).subscribe(data => {
           this.patients.push(data);
           this.newPatient = new Patient();
           alert("Patient details added successfully");
         },
         error =>{
          console.log(error);
         });
       }
     }

     deletePatient(id: number) {
       if (this.isAdmin) {
         this.patientService.deletePatientById(id).subscribe(() => {
          let pid = this.patients.findIndex(p => p.id===id);
          alert("Company record deleted!");
        window.location.reload();
          if(pid!== -1){
            this.patients.splice(pid,1);
            
          }
         },
         error =>{
          console.log(error);
         });
       }
     }

     getPatient(id:number){
      this.patientService.getPatientById(id).subscribe(data =>{
        this.pp = data;
      },
      error =>{
        console.log(error);
      });
      this.updatedPatient.name=this.pp.name;
      this.updatedPatient.disease=this.pp.disease;
      this.updatedPatient.id=this.pp.id;
      console.log(this.updatedPatient);
     }

     updatePatient(id: number) {
       if (this.isAdmin) {
        this.getPatient(id);
         this.patientService.updatePatientById(id,this.updatedPatient).subscribe(() => {
           this.loadPatients();
           alert("Company record deleted!");
         },
         error =>{
          console.log(error);
         });
       }
     }

     loadPatientdetailByDoc(doc: string){ 
       this.patientService.getPatientByDoc(doc).subscribe((data) =>{
          this.patients=data;
          },
          error=>{
            console.log(error); 
     });
    } 
   loadPatientdetailByStage(stage: string){ 
     this.patientService.getPatientByStage(stage).subscribe((data) =>{ 
       this.patients=data;  
      },
      error=>{ 
       console.log(error);
      });
    }
    loadPatientdetailByName(name: string){  
      this.patientService.getPatientByName(name).subscribe((data) =>{ 
           this.patients=data;
      },
      error=>{ 
       console.log(error); 
     }); 
   }
   getStageClass(stage: string): string {
    switch (stage.toLowerCase()) {
      case 'normal':
        return 'table-success';
      case 'severe':
        return 'table-warning';
      case 'critical':
        return 'table-danger';
      default:
        return '';
    }
  }

  
   }
