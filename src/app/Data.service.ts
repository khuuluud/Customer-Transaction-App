import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(`http://localhost:3000/customers`);
  }

  getTransactions(): Observable<any> {
    return this.http.get(`http://localhost:3000/transactions`);
  }
  
}