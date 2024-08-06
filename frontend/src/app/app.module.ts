import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FooddetailsComponent } from './components/pages/fooddetails/fooddetails.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { TextInputeComponent } from './components/partials/text-inpute/text-inpute.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { authInterceptor } from './auth/auth.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    NotFoundComponent,
    FooddetailsComponent,
    CartPageComponent,
    TitleComponent,
    LoginPageComponent,
    RegisterPageComponent,
    TextInputeComponent,
    InputContainerComponent,
    DefaultButtonComponent,
    InputValidationComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop:false
    }),
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])), //---> function base interceptor
    //provideHttpClient(withInterceptors([authInterceptor])) ---> class base use
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
