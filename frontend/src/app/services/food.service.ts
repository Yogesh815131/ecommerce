import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FOODS_URL, FOODS_TAGS_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  //To retrieve all the foods in the mongodb database
  getAllFoods():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  //To retrieve only user searched foods in the mongodb database
  getAllFoodsBySearchTerm(searchterm:String):Observable<Food[]>{
    console.log("foodService", searchterm);    
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchterm);
  }

  //To retrieve all individual tags with their count
  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  //To retrieve the foods from the mongodb database depends upon user clicked tags
  getAllFoodsByTag(tag:String):Observable<Food[]>{
    return tag ==="All" ? this.getAllFoods() : this.http.get<Food[]>(FOODS_BY_TAG_URL+tag);
  }

  //To retrieve the food from the mongodb database depends upon user clicked food(user chosen food)
  getFoodById(foodid:String):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL+foodid);
  }

}
