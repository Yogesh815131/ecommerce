import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-fooddetails',
  templateUrl: './fooddetails.component.html',
  styleUrl: './fooddetails.component.css'
})
export class FooddetailsComponent {
  food!:Food;
  constructor(private activatedRoute:ActivatedRoute, private foodApi:FoodService, private router: Router, private cartApi:CartService) { 
    this.activatedRoute.params.subscribe((params)=>{
      console.log(params['foodid']);
      
      if (params['foodid']) {
        this.foodApi.getFoodById(params['foodid']).subscribe((food_result:Food)=>{
          this.food = food_result;
        })
      }
    })
  }

  addToCart(){
    this.cartApi.addItemToCart(this.food);
    this.router.navigateByUrl('cart-page');
  }
}
