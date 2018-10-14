import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {map} from  'rxjs/operators';
import {HttpClient} from  '@angular/common/http';

interface authResponse {
  token:String,
  success:String,
  status:String
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 tokenKey = 'JWT';
authToken = undefined;
username =  new Subject<String>();
  constructor(private http : HttpClient) { }

  Login(url,payload):Observable<any>{
    return this.http.post<authResponse>(url,payload).pipe(map( res => {
   this.storeCerdentials({username:payload.username,token:res.token});
      return {'success': true, 'username': payload.username };

    })
  )
    
  }

  storeCerdentials(data){
          localStorage.setItem(this.tokenKey,JSON.stringify(data));
         // console.log(data.token);
         this.authToken = data.token;
  }

  getToken(){
    this.authToken = localStorage.getItem('JWT');
    //console.log("Token",this.authToken);
    this.authToken = JSON.parse(this.authToken).token;
   // console.log(this.authToken);
     return  this.authToken;
  }
}
