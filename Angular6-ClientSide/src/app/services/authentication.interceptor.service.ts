import { Injectable,Injector } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {map,tap} from 'rxjs/operators';
import {HttpClient,HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpErrorResponse} from '@angular/common/http';
interface authResponse{
  token:String,
  success:String,
  status:String
}
@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
 constructor(private inj:Injector){}
 intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

  const authService = this.inj.get(AuthenticationService);

  const authToken = authService.getToken();
 // console.log("Token =",authToken);
  const authReq =  req.clone({headers:req.headers.set('Authorization','bearer '+ authToken)})
  return next.handle(authReq);
 }
}

@Injectable()
export class UnauthorizedInterceptor  implements HttpInterceptor{
  constructor(private inj:Injector){}
 intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

  const authService = this.inj.get(AuthenticationService);

  const authToken = authService.getToken();
    return next.handle(req).pipe(tap((event:HttpEvent<any>)=>{

    
    },(err)=>{
            if(err instanceof HttpErrorResponse){
              if(err.status===401 && authToken){
                console.log("Unothorised");
              }
            }
    }))
    

    
}
}
