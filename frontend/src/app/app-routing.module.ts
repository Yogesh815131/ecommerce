import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FooddetailsComponent } from './components/pages/fooddetails/fooddetails.component';

const routes: Routes = [
  { path : '', component:HomeComponent},
  { path : 'search/:searchterm', component:HomeComponent },
  { path : 'tag/:tag', component:HomeComponent},
  { path : 'food/:foodid', component:FooddetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
