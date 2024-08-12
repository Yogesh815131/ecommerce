import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//window.paypal
declare var paypal:any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent implements OnInit{

  @Input() order:Order = new Order();
  @ViewChild('paypal', {static:true})paypalElement!:ElementRef;

  constructor(private cartApi:CartService, private orderApi:OrderService, private router:Router, private toastr:ToastrService){}

  ngOnInit(){
      const self = this
      paypal
        .Buttons({
          createOrder: (data: any, actions: any) =>{
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'CAD',
                    value: self.order.totalPrice
                  },
                },
              ],
            });
          },

          onApprove: async (data:any, actions: any) => {
            const payment = await actions.order.capture();
            this.order.paymentId = payment.id;
            self.orderApi.pay(this.order).subscribe({
              next: (orderId) =>{
                this.cartApi.clearCart();
                this.router.navigateByUrl('/track/'+orderId);
                this.toastr.success('Payment Saved Successfully', 'Success');
              },
              error: (error:any) => {
                this.toastr.error('payment Save Faild', 'Error')
                                
              }
            });
          },

          onError: (err: any) => {
            this.toastr.error('payment Faild', 'Error')
            console.log(err);
          },
        })
        .render(this.paypalElement.nativeElement);
  }
}