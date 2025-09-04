import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AppRole } from '../enums/roles.enum';

function hasAnyRole(userRoles: AppRole[] | undefined, allowed: AppRole[] | undefined): boolean {
  if (!allowed || allowed.length === 0) return true;
  if (!userRoles || userRoles.length === 0) return false;

  if (userRoles.includes(AppRole.ADMIN) || userRoles.includes(AppRole.SUPER_ADMIN)) return true;

  return allowed.some((r) => userRoles.includes(r));
}

export const roleGuard: CanActivateFn = (route) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const user = tokenService.userFromToken();
  const tokenExpired = tokenService.isExpired();

  if (!user || tokenExpired) {
    router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: location.pathname } });
    return false;
  }

  const allowed = route.data?.['roles'] as AppRole[] | undefined;

  if (hasAnyRole(user.roles, allowed)) {
    return true;
  }

  router.navigate(['/errors/403']);
  return false;
};
