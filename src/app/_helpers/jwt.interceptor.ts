import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
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
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        } 
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    
                    if (event.body){
                        let actUser = event.body.ActiveUser;
                        if (currentUser && actUser && actUser.accessToken && 
                        currentUser.token !== actUser.accessToken){
                            this.authenticationService.setUser(actUser);
                        }
                    }
                }
                return event;
            }));
    }
}