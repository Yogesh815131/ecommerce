import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { ToastrService } from 'ngx-toastr';


const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFormLocalStorage());
  public userObservable!:Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  register(user_registerformData:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, user_registerformData).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to My Food App ${user.name}`, "You have Registered Successfully");
        },
        error: (errorMessage)=>{
          this.toastrService.error(errorMessage.error, "Registration Failed")          
        }
      })
    )
  }
  setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  getUserFormLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson){
      return JSON.parse(userJson) as User;
    }
    return new User();
  }
  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLoginData:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLoginData).pipe(
      tap({
        next:(user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to My Food App ${user.name}`,
            'Login Successfull'
          )
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  
}
