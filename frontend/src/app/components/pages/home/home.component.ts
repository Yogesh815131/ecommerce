import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/Food'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods!:Food[];

  constructor(private foodapi:FoodService, private activatedRoute:ActivatedRoute){
    let food_data_as_observable!:Observable<Food[]>;

    this.activatedRoute.params.subscribe((params)=>{
      
      if(params['searchterm']){
        food_data_as_observable = this.foodapi.getAllFoodsBySearchTerm(params['searchterm']);
        food_data_as_observable.subscribe((food_result:Food[])=>{         
          this.foods = food_result;
        });
      }
      else if(params['tag']){

        food_data_as_observable = this.foodapi.getAllFoodsByTag(params['tag']);
        food_data_as_observable.subscribe((food_result:Food[])=>{
          console.log(food_result);          
          this.foods = food_result;

        });
      }
      else{
        food_data_as_observable = this.foodapi.getAllFoods();
        food_data_as_observable.subscribe((food_result:Food[])=>{
          console.log(food_result);          
          this.foods = food_result;
        });
      }
    });
  }
}
