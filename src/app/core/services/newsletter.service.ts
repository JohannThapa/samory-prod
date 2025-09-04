import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  private apiUrl = `${environment.apiUrl}/api/v1/public/newslleter/subscribe`;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  submitSubscriptionForm(data: { email: string }): Observable<any> {
    const headers = new HttpHeaders({
      'X-API-KEY': this.apiKey,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
