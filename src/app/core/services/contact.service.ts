import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/v1/public/newslleter/contact-us`;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  submitContactForm(data: { name: string; email: string; message: string }): Observable<any> {
    const headers = new HttpHeaders({
      'X-API-KEY': this.apiKey,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
