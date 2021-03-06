import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http:HttpClient) { }

  signUp(f){
    console.log(f.value);
    this.http.post('http://localhost:3000/users/signup',f.value)
    .subscribe(data =>{
            if(data){
              console.log(data);
            }
    })
  }
  ngOnInit() {
  }

}
