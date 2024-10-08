import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FooddetailsComponent } from './components/pages/fooddetails/fooddetails.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentpageComponent } from './components/pages/paymentpage/paymentpage.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';


const routes: Routes = [
  { path : '', component:HomeComponent},
  { path : 'search/:searchterm', component:HomeComponent },
  { path : 'tag/:tag', component:HomeComponent},
  { path : 'food/:foodid', component:FooddetailsComponent },
  { path : 'cart-page', component:CartPageComponent},
  { path : 'login', component:LoginPageComponent},
  { path : 'register', component:RegisterPageComponent},
  { path : 'checkout', component:CheckoutPageComponent, canActivate:[AuthGuard]},
  { path : 'payment', component:PaymentpageComponent, canActivate:[AuthGuard]},
  { path : 'track/:orderId', component:OrderTrackPageComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
