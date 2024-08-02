import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private router:Router, private activateRoute:ActivatedRoute, private userAPi:UserService, private formBuilder:FormBuilder){

  }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:['', [Validators.required, Validators.email]],
        password:['', Validators.required]
      });

      this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.userAPi.login({email: this.fc['email'].value, password:this.fc['password'].value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    });
  }

}
