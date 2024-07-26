import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FooddetailsComponent } from './components/pages/fooddetails/fooddetails.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';


const routes: Routes = [
  { path : '', component:HomeComponent},
  { path : 'search/:searchterm', component:HomeComponent },
  { path : 'tag/:tag', component:HomeComponent},
  { path : 'food/:foodid', component:FooddetailsComponent },
  { path : 'cart-page', component:CartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
