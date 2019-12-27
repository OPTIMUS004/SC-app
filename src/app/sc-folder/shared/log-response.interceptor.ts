import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"

@Injectable()

export class LogResponseInterceptor implements HttpInterceptor {
    constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpEvent<any>> {
        

       return next.handle(req)
       .pipe(
           tap(event => {
               if(event.type === HttpEventType.Response){
                
               }else{
                
               }
           })
       );
    }

}