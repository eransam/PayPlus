import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Adjust as per your API URL

  constructor(private http: HttpClient) {}

  login(credentials: CredentialsModel): Promise<void> {
    const url = `${this.apiUrl}/auth/login`; // Adjust endpoint as per your API
    return this.http.post<void>(url, credentials).toPromise();
  }

  register(user: any): Promise<void> {
    const url = `${this.apiUrl}/auth/register`; // Adjust endpoint as per your API
    return this.http.post<void>(url, user).toPromise();
  }

  logout(): void {
    // Implement logout functionality, such as clearing local storage or session data
    // Example: localStorage.removeItem('token');
  }

  getUser(): UserModel | null {
    // Implement logic to retrieve logged-in user details
    // Example: return JSON.parse(localStorage.getItem('user'));
    return null; // Placeholder
  }

  // Add more methods as needed, such as refreshToken, checkToken, etc.
}
