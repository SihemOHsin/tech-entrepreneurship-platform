import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultationDTOs } from "./consulaltion.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private baseUrl = environment.apiconsultation + '/consultations';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };

  constructor(private http: HttpClient) { }


  findAll(): Observable<ConsultationDTOs[]> {
    return this.http.get<ConsultationDTOs[]>(`${this.baseUrl}`, this.httpOptions);
  }

  createConsultation(consultation: ConsultationDTOs): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, consultation, this.httpOptions);
  }

  getConsultationById(id: number): Observable<ConsultationDTOs> {
    return this.http.get<ConsultationDTOs>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  deleteConsultation(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  updateConsultation(id: number, updatedConsultation: ConsultationDTOs): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, updatedConsultation, this.httpOptions);
  }

  findConsultationByBusinessId(businessId: number): Observable<ConsultationDTOs[]> {
    return this.http.get<ConsultationDTOs[]>(`${this.baseUrl}/business/${businessId}`, this.httpOptions);
  }
}
