import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { CYBER_DASHBOARD_API } from '../constants/api/cyber-dashboard';

@Injectable({
  providedIn: 'root',
})
export class CyberDashboardService {
  private apiUrl = `${environment.apiUrl}/api/v1/dashboard/`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.get();

    const bearer = userToken;

    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${bearer}`)
      .set('X-API-KEY', environment.apiKey)
      .set('Content-Type', 'application/json');

    return headers;
  }

  getOverview(): Observable<any> {
    const overviewUrl = this.apiUrl + CYBER_DASHBOARD_API.OVERVIEW;
    const headers = this.getHeaders();
    return this.http.get(overviewUrl, { headers });
  }
}
