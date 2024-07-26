import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!:Cart;

  constructor(private cartApi:CartService) { 
    this.cartApi.getCartObservable().subscribe((cart_service_data)=>{
      this.cart = cart_service_data;
    });
   }

   quantitychange(cartItem:CartItem, quantitySelected:string){
      const quantity = parseInt(quantitySelected);
      this.cartApi.changeQuantity(cartItem.food.id, quantity);
   }

   removeItemInCart(cartItem:CartItem){
    this.cartApi.removeFromCart(cartItem.food.id);
   }

}
