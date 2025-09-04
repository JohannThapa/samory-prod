import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class RootAuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private readonly API_KEY = 'APIKEY';
  private readonly baseUrl = `${environment.apiUrl}/v1/public/auth`;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  private get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.API_KEY,
    });
  }

  register(userData: any, userType: string): Observable<any> {
    let endpoint = '';
    switch (userType) {
      case 'admin':
        endpoint = `${this.baseUrl}/register-admin`;
        break;
      case 'super-admin':
        endpoint = `${this.baseUrl}/register-super-admin`;
        break;
      case 'organization':
        endpoint = `${this.baseUrl}/register-organization`;
        break;
      case 'operator':
        endpoint = `${this.baseUrl}/register-operator`;
        break;
      case 'root':
        endpoint = `${this.baseUrl}/register-root`;
        break;
      default:
        return throwError(() => new Error('Invalid user type'));
    }

    return this.http.post<any>(endpoint, userData, { headers: this.authHeaders }).pipe(
      catchError((error) => {
        return throwError(() => new Error('Registration failed.'));
      }),
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials, { headers: this.authHeaders }).pipe(
      map((response) => {
        const user: User = response.user;
        const token: string = response.token;

        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        this.currentUserSubject.next(user);
        return response;
      }),
      catchError((error) => {
        return throwError(() => new Error('Login failed.'));
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }
}
