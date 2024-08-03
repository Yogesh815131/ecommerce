import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const userApi = inject(UserService);

  const user = userApi.currentUser;
  if(user.token){
    req = req.clone({
      setHeaders:{
        access_token: user.token
      }
    })
  }

  return next(req);
};
