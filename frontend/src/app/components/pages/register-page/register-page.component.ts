import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit{

  registerForm!:FormGroup;
  isSubmitted:boolean = false;
  returnUrl = '';

  constructor(private userapi:UserService, private activatedRoute:ActivatedRoute, private router:Router, private formBuilder:FormBuilder){}

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required]],
        address: ['', [Validators.required, Validators.minLength(10)]]
      },{
        Validators: PasswordsMatchValidator('password', 'confirmPassword')
      });
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }
    const all_form_values = this.registerForm.value;
    const user:IUserRegister={
      name: all_form_values.name,
      email: all_form_values.email,
      password: all_form_values.password,
      confirmPassword:all_form_values.confirmPassword,
      address: all_form_values.address
    }
    this.userapi.register(user).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
