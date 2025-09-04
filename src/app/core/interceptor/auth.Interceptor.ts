import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from '../services/token.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const PUBLIC_AUTH_PREFIX = '/api/v1/public/auth';
const LOGIN_PATH = `${PUBLIC_AUTH_PREFIX}/login`;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (req.url.includes('assets/i18n')) {
    return next(req);
  }

  let headers = req.headers || new HttpHeaders();

  const isPublicAuth = req.url.includes(PUBLIC_AUTH_PREFIX);
  const isLogin = req.url.includes(LOGIN_PATH);

  if (isPublicAuth) {
    headers = headers.set('X-API-KEY', environment.apiKey);
  }

  const token = tokenService.get();
  const needsBearer = !isPublicAuth && !!token;

  if (needsBearer) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authedReq = req.clone({ headers });

  return next(authedReq).pipe(
    catchError((err) => {
      if (err?.status === 401) {
        tokenService.clear();
        router.navigate(['/auth/sign-in'], { replaceUrl: true });
      }
      return throwError(() => err);
    }),
  );
};
