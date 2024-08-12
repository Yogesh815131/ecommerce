import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrl: './paymentpage.component.css'
})
export class PaymentpageComponent {

  order:Order = new Order();
  
  constructor(private orderApi:OrderService, private router:Router) { 
    this.orderApi.getNewOrderForCurrentUser().subscribe({
      next:(order)=>{
        this.order = order;
      },
      error:(err)=>{
        this.router.navigateByUrl('/checkout');
      }
    });
  }

}
