import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators"

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {
    constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpEvent<any>> {
        

        let jsonReq: HttpRequest<any> = req.clone({
            setHeaders: {'Content-Type': 'application/json'}
        });
       return next.handle(req);
    }

}