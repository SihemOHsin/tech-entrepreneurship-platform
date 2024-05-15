import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from './order.model';
import { environment } from "../../environments/environment";

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

  findAll(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.baseUrl}/all`, this.httpOptions);
  }

  deleteOrderById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  generateReport(requestMap: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/report`, requestMap, { ...this.httpOptions, responseType: 'text' as 'json' });
  }

  generatePdf(requestMap: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pdf`, requestMap, { ...this.httpOptions, responseType: 'blob' });
  }
}
