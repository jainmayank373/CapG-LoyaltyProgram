import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  deals ;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private http:HttpClient,private breakpointObserver: BreakpointObserver) {}
getPerson(){
 this.http.get('http://localhost:3000/users').subscribe((data)=>{
   console.log(data);
 })
  console.log("GET METHOD CALLED");
  }

  }
