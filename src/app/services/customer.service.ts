import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { updateDecorator } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseUrl + '/api/customers');
  }

  addCustomer(addCustomerRequest: Customer): Observable<Customer>{
    addCustomerRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Customer>(this.baseUrl + '/api/customers', addCustomerRequest);
  }

  getCustomer(id: string): Observable<Customer>{
    return this.http.get<Customer>(this.baseUrl + '/api/customers/' + id);
  }

  updateCustomer(id: string, updatedCustomerRequest: Customer): Observable<Customer>{
    return this.http.put<Customer>(this.baseUrl + '/api/customers/' + id, updatedCustomerRequest);
  }

  deleteCustomer(id: string): Observable<Customer>{
    return this.http.delete<Customer>(this.baseUrl + '/api/customers/' + id);
  }
}
