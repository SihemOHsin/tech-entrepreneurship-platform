import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { OrderDTO } from './order.model';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiorder + '/orders';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };

  constructor(private http: HttpClient) { }

  saveOrder(orderDetails: OrderDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveOrder`, orderDetails, this.httpOptions);
  }

  getOrderById(id: string): Observable<OrderDTO> {
    return this.http.get<OrderDTO>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  findAllOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.baseUrl}/all`, this.httpOptions);
  }

  deleteOrderById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

 /* generateReport(orderId: string): Observable<any> {
    const reportRequest = { orderId };
    console.log("Report request payload:", reportRequest);

    return this.http.post(`${this.baseUrl}/report`, reportRequest, this.httpOptions);

  }*/

  generateReport(requestMap: any): Observable<string> {
    const httpOptionsWithTextResponse = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      }),
      responseType: 'text' as 'json' // Ensuring response is treated as text
    };

    return this.http.post<string>(`${this.baseUrl}/report`, requestMap, httpOptionsWithTextResponse)
      .pipe(
        map(response => response), // Directly return the string response
        catchError((error: HttpErrorResponse) => {
          console.error('Error generating report:', error);
          return throwError(() => new Error('Error generating report: ' + error.message));
        })
      );
  }


  generatePdf(requestMap: any): Observable<Blob> {
    const httpOptionsWithBlob = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      }),
      responseType: 'blob' as 'json'
    };
    return this.http.post<Blob>(`${this.baseUrl}/pdf`, requestMap, httpOptionsWithBlob);
  }
}
