import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Patient } from "./patient";

@Injectable({
    providedIn: 'root'
  })
  export class PatientService {
  
    constructor(private http: HttpClient) { }
    private baseUrl = 'http://localhost:8079/Patient';
      addPatient(patient: Patient):Observable<Patient>{  
          return this.http.post<Patient>(this.baseUrl,patient); 
      } 
      getAllPatients():Observable<Array<Patient>>{  
          return this.http.get<Array<Patient>>(this.baseUrl); 
      } 
      getPatientByName(name: string):Observable<Array<Patient>>{ 
         return this.http.get<Array<Patient>>(`${this.baseUrl}?name=${name}`);  
      }
      getPatientById(id: number):Observable<Array<Patient>>{ 
        return this.http.get<Array<Patient>>(`${this.baseUrl}/${id}`);  
     }
    getPatientByDoc(doc: string):Observable<Array<Patient>>{
        return this.http.get<Array<Patient>>(`${this.baseUrl}?doc=${doc}`); 
     } 
    getPatientByStage(stage: string):Observable<Array<Patient>>{  
        return this.http.get<Array<Patient>>(`${this.baseUrl}?stage=${stage}`);  
    }
    deletePatientById(id:number):Observable<Patient>{ 
       return this.http.delete<Patient>(`${this.baseUrl}/${id}`);
    }
    updatePatientById(id:number,patient: Patient):Observable<Patient>{ 
       return this.http.put<Patient>(`${this.baseUrl}/${id}`,patient);
    }
  
  }