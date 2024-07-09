import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = environment.apiUrl; // Adjust as per your API URL

  constructor(private http: HttpClient) {}

  getAllCustomers(): Promise<Customer[]> {
    const url = `${this.apiUrl}/customers`; // Adjust endpoint as per your API
    return this.http.get<Customer[]>(url).toPromise();
  }

  addCustomer(customer: Customer): Promise<Customer> {
    const url = `${this.apiUrl}/customers`; // Adjust endpoint as per your API
    return this.http.post<Customer>(url, customer).toPromise();
  }

  // Add more methods as needed, such as updateCustomer, deleteCustomer, etc.
}
