import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubjet: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addItemToCart(food: Food) {
    let cartItem = this.cart.items.find((fooditem) => fooditem.food.id === food.id)
    if (cartItem) {
      return;
    }
    this.cart.items.push(new CartItem(food))
    this.setCartToLocalStorage();
  }

  private setCartToLocalStorage() {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    let cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubjet.next(this.cart);
  }

  getCartObservable() {
    return this.cartSubjet.asObservable();
  }

  getCart() {
    return this.cartSubjet.value;
  }

  private getCartFromLocalStorage() {
    const cartJson = localStorage.getItem("Cart");
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((fooditem) => fooditem.food.id === foodId);
    if (!cartItem) {
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string) {
    this.cart.items = this.cart.items.filter((fooditem)=>fooditem.food.id != foodId);
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

}
