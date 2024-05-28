import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultationDTOs } from "./consulaltion.model";
import { environment } from "../../environments/environment";
import {Consultation} from "../order/order.model";

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

  deleteConsultation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }


  updateConsultation(id: number, updatedConsultation: Consultation): Observable<ConsultationDTOs> {
    return this.http.put<ConsultationDTOs>(`${this.baseUrl}/${id}`, updatedConsultation, this.httpOptions);
  }


  findConsultationByBusinessId(businessId: number): Observable<ConsultationDTOs[]> {
    return this.http.get<ConsultationDTOs[]>(`${this.baseUrl}/business/${businessId}`, this.httpOptions);
  }
}
