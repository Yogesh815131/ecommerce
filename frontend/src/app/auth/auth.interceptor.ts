import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const userApi = inject(UserService);
  const user = userApi.currentUser;

  if (user.token) {
    req = req.clone({
      setHeaders: {
        access_token: user.token
      }
    });
  }

  return next(req);
};


// Class base Interceptor
/*
  import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userapi: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.userapi.currentUser;
    if(user.token)
    {
      request = request.clone({
        setHeaders:{
          access_token: user.token
        }
      })
    }
    return next.handle(request);
  }
}

*/
