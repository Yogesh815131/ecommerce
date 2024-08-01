import { Component, OnInit, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-inpute.component.html',
  styleUrl: './text-inpute.component.css'
})
export class TextInputeComponent implements OnInit{

  @Input()control!:AbstractControl;
  @Input()showErrorsWhen:boolean = true;
  @Input()label!:string;
  @Input()type: 'text' | 'password' | 'email' = 'text';

  constructor(){}
  ngOnInit() {      
  }

  get formControl(){
    return this.control as FormControl;
  }

}
