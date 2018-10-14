import { Component, OnInit } from '@angular/core';
import {DealsService} from '../services/deals.service';
import {UsersService} from '../services/users.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
 deals;
 isAddedtoCart:String=null;
 constructor(private usersService:UsersService,private  dealService:DealsService,private matSnackBar:MatSnackBar) {

                    this.dealService.getDeal('http://localhost:3000/deals').subscribe(data=>{

                          this.deals = data;
                     //     console.log(data);
                    })

 }

addCart(deal){
//  console.log("ID",deal);
      this.usersService.addtocart('http://localhost:3000/deals/addcart',{_id:deal._id})
      .subscribe(data=>{
       console.log(data);
          this.matSnackBar.open(data.message,null,{
            duration:2000,
          });
          this.isAddedtoCart =  data.message;
      })
}
    optin(deal){
      this.dealService.optin('http://localhost:3000/deals/optin',{_id:deal._id}).subscribe(data=>{
        console.log(data);
      })

    }
  ngOnInit() {
  }

}
