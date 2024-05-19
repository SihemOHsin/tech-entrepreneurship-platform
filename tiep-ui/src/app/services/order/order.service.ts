import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from './order.model';
import { environment } from "../../environments/environment";
import {map} from "rxjs/operators";

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

  saveOrder(orderDetails: OrderDTO): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(`${this.baseUrl}/saveOrder`, orderDetails, this.httpOptions);
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

  generateReport(requestMap: any): Observable<string> {
    return this.http.post<any>(`${this.baseUrl}/report`, requestMap, this.httpOptions)
      .pipe(
        map(response => response && response.report) // Extract the report data from the response
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
