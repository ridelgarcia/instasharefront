import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../_services';
import { environment } from "environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const isInternalRequest = request.url.startsWith(environment.apiUrl);
        let currentUser = this.authenticationService.currentUserValue;
        


        if (currentUser && currentUser.token && isInternalRequest) {
            const headers = new HttpHeaders({
                'Authorization': 'Bearer '+ currentUser.token,
                'Access-Control-Allow-Origin': 'http://localhost:4200',
                'Content-Type': 'application/json'
              });
            request = request.clone({headers});
        } 
        else{
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': 'http://localhost:4200',
                'Content-Type': 'application/json'
              });
            request = request.clone({headers});
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {                    
                    
                }
                return event;
            }));
    }
}