import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {
bounsArray;
  constructor(private userService:UsersService) {

    this.userService.getBouns('http://localhost:3000/deals/redeem')
    .subscribe(bonus=>{
      console.log(bonus);
          this.bounsArray = bonus.bonus;
    })
   }

redeem(data){
  console.log(typeof(data));
this.userService.redeemBouns('http://localhost:3000/deals/redeem',{data:data})
.subscribe(res=>{
  console.log(res);
      this.bounsArray = res.bonus;
})
}
  ngOnInit() {
  }

}
