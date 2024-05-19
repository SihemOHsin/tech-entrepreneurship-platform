import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Review} from "../expertise/expertise-dto.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = environment.apireview + '/reviews';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200' // Replace with your Angular app URL
    })
  };

  constructor(private http: HttpClient) { }

  getAllReviews(businessId: number): Observable<Review[]> {
    const params = new HttpParams().set('businessId', businessId.toString());
    return this.http.get<Review[]>(this.baseUrl, { params, ...this.httpOptions });
  }

  addReview(businessId: number, review: Review): Observable<string> {
    const params = new HttpParams().set('businessId', businessId.toString());
    return this.http.post<string>(this.baseUrl, review, { params, ...this.httpOptions });
  }

  getReview(reviewId: number): Observable<Review> {
    const url = `${this.baseUrl}/${reviewId}`;
    return this.http.get<Review>(url, this.httpOptions);
  }

  updateReview(reviewId: number, review: Review): Observable<string> {
    const url = `${this.baseUrl}/${reviewId}`;
    return this.http.put<string>(url, review, this.httpOptions);
  }

  deleteReview(reviewId: number): Observable<string> {
    const url = `${this.baseUrl}/${reviewId}`;
    return this.http.delete<string>(url, this.httpOptions);
  }
}
