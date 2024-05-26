import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Business, ExpertiseDTO} from './expertise-dto.model';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {
  private baseUrl = environment.apiexpertise+ '/expertises';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200' // Replace with your Angular app URL
    })
  };

  constructor(private http: HttpClient) { }

  getAllExpertises(): Observable<ExpertiseDTO[]> {
    return this.http.get<ExpertiseDTO[]>(`${this.baseUrl}`, this.httpOptions);
  }

  getExpertiseById(id: number): Observable<ExpertiseDTO> {
    return this.http.get<ExpertiseDTO>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  createExpertise(expertise: ExpertiseDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, expertise, this.httpOptions);
  }

  updateExpertise(id: number, updatedExpertise: ExpertiseDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedExpertise, this.httpOptions);
  }

  deleteExpertise(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  getExpertisesByBusinessId(businessId: number): Observable<ExpertiseDTO[]> {
    return this.http.get<ExpertiseDTO[]>(`${this.baseUrl}/business/${businessId}`, this.httpOptions);
  }


  getReviewer(reviewId: number): Observable<Business> {
    return this.http.get<Business>(`${this.baseUrl}/reviews/${reviewId}/reviewer-business`);
  }

  getReviewee(businessId: number): Observable<Business> {
    return this.http.get<Business>(`${this.baseUrl}/business/${businessId}/reviewee`);
  }
}
