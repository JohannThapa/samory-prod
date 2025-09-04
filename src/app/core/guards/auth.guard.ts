import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (auth.isAuthenticated() && !tokenService.isExpired()) {
    return true;
  }

  router.navigate(['/auth/sign-in'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
