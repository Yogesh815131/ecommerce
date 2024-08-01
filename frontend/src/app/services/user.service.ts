import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { USER_REGISTER_URL } from '../shared/constants/urls';


const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFormLocalStorage());
  public userObservable!:Observable<User>;

  constructor(private http:HttpClient, ) { 
    this.userObservable = this.userSubject.asObservable();
  }

  register(user_registerformData:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, user_registerformData).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          //toster message
        },
        error: (errorMessage)=>{
          console.log(errorMessage.error);          
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

  
}
