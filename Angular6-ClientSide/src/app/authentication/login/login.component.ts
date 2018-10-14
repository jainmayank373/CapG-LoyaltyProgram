import { Component, OnInit } from '@angular/core';
import {Router} from  '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private service:AuthenticationService) { }
login(f){
  console.log(f.value);
      this.service.Login('http://localhost:3000/users/login',f.value).subscribe(res=>{
    console.log("Response",res);
    this.router.navigate(['/welcome'])
  });

}
  ngOnInit() {
  }

}
