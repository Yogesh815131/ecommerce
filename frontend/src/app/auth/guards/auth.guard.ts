import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userApi = inject(UserService);
  const router = inject(Router);
  if (userApi.currentUser.token) return true;
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
  return false;
};

// Class Base authGuard
/*
  import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userapi:UserService, private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.userapi.currentUser.token) return true;

    this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
    return false;
  }

}

*/