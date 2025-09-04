import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, computed, effect, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { UserStorageService } from './user-storage.service';
import {
  LoginPayload,
  RegisterPayload,
  RegisterSuccessResponse,
  RegisterUserType,
  User,
  ResetPasswordPayload,
  LoginSuccessResponseBE,
} from '../models/auth.model';
import {
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINTS,
  CONFIRM_ACCOUNT_ENDPOINT,
  RESEND_CONFIRM_MAIL_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  RESET_PASSWORD_ENDPOINT,
} from '../constants/auth';
import { AppRole } from '../enums/roles.enum';
import { UserType } from '../enums/user.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  private _user = signal<User | null>(this.userStorage.get());
  user = computed(() => this._user());
  isAuthenticated = computed(() => !!this._user());
  userRoles = computed<AppRole[] | null>(() => this._user()?.roles ?? null);
  userType = computed<UserType | null>(() => this._user()?.type ?? null);

  constructor(private http: HttpClient, private tokenService: TokenService, private userStorage: UserStorageService) {
    effect(() => {
      const u = this._user();
      if (u) this.userStorage.set(u);
      else this.userStorage.clear();
    });
  }

  register(payload: RegisterPayload, type: RegisterUserType) {
    const endpoint = REGISTER_ENDPOINTS[type];
    if (!endpoint) {
      return throwError(() => new Error('Invalid user type'));
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': environment.apiKey,
    });

    return this.http.post<RegisterSuccessResponse>(url, payload, { headers }).pipe(
      catchError((err) => {
        const msg = err?.error?.message || 'Registration failed. Please check the form and try again.';
        return throwError(() => new Error(msg));
      }),
    );
  }

  login(payload: LoginPayload) {
    const url = `${this.baseUrl}${LOGIN_ENDPOINT}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': environment.apiKey,
    });

    return this.http.post<LoginSuccessResponseBE>(url, payload, { headers }).pipe(
      map((res) => {
        const token = res?.data;
        if (!token) {
          throw new Error('Login failed: token missing in response.');
        }

        this.tokenService.set(token);

        const user = this.tokenService.userFromToken(token);
        if (!user?.id || !user?.email) {
          this._user.set({
            id: user?.id ?? '',
            email: user?.email ?? payload.email,
            fullName: user?.fullName ?? '',
            phone: user?.phone,
            address: user?.address,
            organizationName: user?.organizationName,
          });
        } else {
          this._user.set(user);
        }

        return { message: res.message };
      }),
      catchError((err) => {
        const msg =
          err?.status === 401
            ? 'Invalid email or password.'
            : err?.error?.message || err?.message || 'Login failed. Please try again.';
        return throwError(() => new Error(msg));
      }),
    );
  }

  logout(): void {
    this.tokenService.clear();
    this._user.set(null);
  }

  confirmAccount(token: string) {
    const url = `${this.baseUrl}${CONFIRM_ACCOUNT_ENDPOINT}`;
    const params = new HttpParams().set('token', token);
    const headers = new HttpHeaders({
      'X-API-KEY': environment.apiKey,
    });

    return this.http.get<{ message: string }>(url, { params, headers }).pipe(
      catchError((err) => {
        const msg = err?.error?.message || 'Email confirmation failed. The token may be invalid or expired.';
        return throwError(() => new Error(msg));
      }),
    );
  }

  resendConfirmMail(email: string) {
    const url = `${this.baseUrl}${RESEND_CONFIRM_MAIL_ENDPOINT}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': environment.apiKey,
    });
    const body = { email };

    return this.http.post<{ message: string }>(url, body, { headers }).pipe(
      catchError((err) => {
        const msg = err?.error?.message || 'Failed to resend the email.';
        return throwError(() => new Error(msg));
      }),
    );
  }

  forgotPassword(email: string) {
    const url = `${this.baseUrl}${FORGOT_PASSWORD_ENDPOINT}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': environment.apiKey,
    });
    const body = { email };

    return this.http.post<{ message: string }>(url, body, { headers }).pipe(
      catchError((err) => {
        const msg = err?.error?.message || 'Failed to send the password reset link.';
        return throwError(() => new Error(msg));
      }),
    );
  }

  resetPassword(payload: ResetPasswordPayload) {
    const url = `${this.baseUrl}${RESET_PASSWORD_ENDPOINT}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': environment.apiKey,
    });

    return this.http.post<{ message: string }>(url, payload, { headers }).pipe(
      catchError((err) => {
        const msg = err?.error?.message || 'Failed to reset password. The token may be invalid or expired.';
        return throwError(() => new Error(msg));
      }),
    );
  }
}
