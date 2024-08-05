import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit{

  order:Order = new Order();
  checkoutForm!:FormGroup;

  constructor(private userApi:UserService, private cartApi:CartService, private orderApi:OrderService, private router:Router, private formBuilder:FormBuilder, private toastr:ToastrService){
    const cart = this.cartApi.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
      let {name, address} = this.userApi.currentUser;
      this.checkoutForm = this.formBuilder.group({
        name:[name, Validators.required],
        address:[address, Validators.required]
      })
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastr.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    if(!this.order.addressLatLng){
      this.toastr.warning('Please select your location onthe map', 'Location');
      return;
    }

    this.order.name = this.fc['name'].value
    this.order.address = this.fc['address'].value

    this.orderApi.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payment')
      },
      error:(errorResponse) =>{
        this.toastr.error(errorResponse.error, 'Cart');
      }
    })
  }

}
