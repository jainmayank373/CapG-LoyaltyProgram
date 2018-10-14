import { Component, OnInit } from '@angular/core';
import {UsersService } from '../services/users.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItem;
  constructor(private userService:UsersService) { 
    this.userService.getCart('http://localhost:3000/deals/addcart')
    .subscribe(data=>{
      console.log("shopping cart",data);
      this.cartItem = data;
    })
  }

  ngOnInit() {
  }

}
