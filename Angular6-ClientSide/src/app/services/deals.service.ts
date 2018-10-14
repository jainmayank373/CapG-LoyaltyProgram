import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http:HttpClient) { }

  getDeal(url):Observable<any>{

    return  this.http.get(url);

  }
  optin(url,payload):Observable<any>{
    return this.http.post(url,payload);
  }

}
