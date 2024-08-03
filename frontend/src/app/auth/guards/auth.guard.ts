import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userApi = inject(UserService);
  const router = inject(Router);
  if (userApi.currentUser.token) return true;
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
  return false;
};
