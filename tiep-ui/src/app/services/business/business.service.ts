import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessDTO } from './business-dto.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private baseUrl = environment.apibusiness;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200' // Replace with your Angular app URL
    })
  };

  constructor(private http: HttpClient) { }

  getAllBusinesses(): Observable<BusinessDTO[]> {
    return this.http.get<BusinessDTO[]>(`${this.baseUrl}/businesses`, this.httpOptions);
  }

  getBusinessById(id: number): Observable<BusinessDTO> {
    return this.http.get<BusinessDTO>(`${this.baseUrl}/businesses/${id}`, this.httpOptions);
  }

  createBusiness(business: BusinessDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/businesses`, business, this.httpOptions);
  }

  updateBusiness(id: number, updatedBusiness: BusinessDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/businesses/${id}`, updatedBusiness, this.httpOptions);
  }

  deleteBusiness(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/businesses/${id}`, this.httpOptions);
  }

  getBusinessesByUserId(userId: number): Observable<BusinessDTO[]> {
    return this.http.get<BusinessDTO[]>(`${this.baseUrl}/businesses/user/${userId}`, this.httpOptions);
  }

  getBusinessesByUserRole(userRole: string): Observable<BusinessDTO[]> {
    return this.http.get<BusinessDTO[]>(`${this.baseUrl}/businesses/role/${userRole}`, this.httpOptions);
  }

  uploadBusinessLogo(businessId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/businesses/logo/${businessId}`, formData, this.httpOptions);
  }
}
