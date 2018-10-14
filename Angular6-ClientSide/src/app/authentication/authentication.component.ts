import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor() { }
 links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';

  ngOnInit() {
  }

}
