import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
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
/*
  createBusiness(business: BusinessDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/businesses`, business, this.httpOptions);
  }
 */

  createBusiness(business: BusinessDTO): Observable<any> {
    console.log('Creating business:', business); // Log the business being created
    return this.http.post(`${this.baseUrl}/businesses`, business, this.httpOptions)
      .pipe(
        tap(response => console.log('Create business response:', response)), // Log the response
        catchError(this.handleError<any>('createBusiness'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Log the error to console
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

 /* updateBusiness(id: number, updatedBusiness: BusinessDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/businesses/${id}`, updatedBusiness, this.httpOptions);
  }*/
  updateBusiness(id: number, updatedBusiness: BusinessDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/businesses/${id}`, updatedBusiness, this.httpOptions)
      .pipe(
        tap(response => console.log('Update business response:', response)), // Log the response
        catchError(this.handleError<any>('updateBusiness'))
      );
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

  getBusinessesByUserEmail(email: string): Observable<BusinessDTO[]> {
    return this.http.get<BusinessDTO[]>(`${this.baseUrl}/businesses/user-email/${email}`);
  }


}
