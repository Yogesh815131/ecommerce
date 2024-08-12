import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  name!:string
  cartQuantity=0;
  user!:User;
  constructor(private cartApi:CartService, private userApi:UserService){
    this.cartApi.getCartObservable().subscribe((info)=>{
      this.cartQuantity = info.totalCount;
    });

    this.userApi.userObservable.subscribe((loggedInUser)=>{
      this.user = loggedInUser;
      this.name = loggedInUser.name;
    });    
  }

  logout(){
    this.userApi.logout()
  }

  get isAuth(){
    return this.user.token;
  }

}
