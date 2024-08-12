import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.css'
})
export class OrderTrackPageComponent {

  order!:Order;

  constructor(private orderApi:OrderService, private activatedRoute:ActivatedRoute){
    const params = this.activatedRoute.snapshot.params;
    if(!params['orderId']){
      return;
    }

    this.orderApi.trackOrderById(params['orderId']).subscribe((order)=>{
      this.order = order;
    })
  }

}
