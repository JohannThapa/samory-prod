import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssociationService {
  private apiUrl = `${environment.apiUrl}/api/v1/public/associations/declare`;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  declareAssociation(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'X-API-KEY': this.apiKey,
    });
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
