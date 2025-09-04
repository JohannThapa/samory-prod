import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { ApiResponse, NotificationsResponse } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/api/v1/notifications`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.get();
    if (!userToken) {
      throw new Error('Authentication token not found.');
    }
    return new HttpHeaders()
      .set('Authorization', `Bearer ${userToken}`)
      .set('X-API-KEY', environment.apiKey)
      .set('Content-Type', 'application/json');
  }

  getNotifications(): Observable<NotificationsResponse> {
    const headers = this.getHeaders();
    return this.http.get<NotificationsResponse>(this.apiUrl, { headers });
  }

  markNotificationAsSeen(id: number): Observable<ApiResponse> {
    const headers = this.getHeaders();
    const markSeenUrl = `${this.apiUrl}/${id}/seen`;
    return this.http.post<ApiResponse>(markSeenUrl, null, { headers });
  }

  deleteNotification(id: number): Observable<ApiResponse> {
    const headers = this.getHeaders();
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse>(deleteUrl, { headers });
  }
}
