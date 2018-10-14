import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
historyDatas;
  constructor(private userService:UsersService) { 
     this.userService.getHistory('http://localhost:3000/history')
      .subscribe(data=>{
        console.log("History ",data);
        this.historyDatas = data;
      })
    }

  ngOnInit() {
  }

}
