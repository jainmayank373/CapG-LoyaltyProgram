import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  addtocart(url,payload):Observable<any>{
  //  console.log(payload);
      return    this.http.post(url,payload);
  }
    getHistory(url):Observable<any>{
        return this.http.get(url);
    }
      getCart(url):Observable<any>{
        return this.http.get(url);

      }

      getBouns(url):Observable<any>{
            return this.http.get(url);
      }
      redeemBouns(url,payload):Observable<any>{
            return  this.http.post(url,payload);
      }
}
