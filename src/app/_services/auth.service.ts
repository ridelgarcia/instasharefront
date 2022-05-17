import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable ,of } from 'rxjs';
import {map, filter} from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User } from '../_models/user.model';
import { Role } from '../_models/role.model';
import { NotificationService } from './notification.service';
@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUser: BehaviorSubject<User>;
    private authenticated: boolean = false;
    private notificationService:NotificationService;
    private userKey : string = 'currentUser';
    constructor(private http: HttpClient) {
        this.currentUser = new BehaviorSubject<User>(null);
        if(localStorage.getItem(this.userKey) != null){
            this.setUser(JSON.parse(localStorage.getItem(this.userKey)));
            this.authenticated = true;
        }
        else{
            this.authenticated = false;
        }       
    }
    set accessToken(token: string)
    {
        if(this.authenticated){
            this.currentUser.value.token = token;
            localStorage.setItem(this.userKey,JSON.stringify(this.currentUser.value));
        }        
    }

    get accessToken(): string
    {
       var token : string = '';
       if(this.authenticated){
           token = this.currentUser.value.token;
       }
        return token ?? '';
    }
    public get currentUserValue(): User {
        return this.currentUser.value;
    }

    login(email:string, password:string) {
        return this.http.post<any>(`${environment.apiUrl}/user/signin`, {email,password})
            .pipe(map(user => {
                const actUser = user;                
                if (actUser && actUser.token) {                    
                    this.setUser(actUser);                    
                    this.authenticated = true;
                    console.log(this.authenticated);
                    this.notificationService = new NotificationService();
                }
                return user;
            }));
    }

    signup(name: string, lastname: string, email: string,  password: string, role: Role) {
        return this.http.post<any>(`${environment.apiUrl}/user/signup`, { name, lastname, email, password,role})
            .pipe(map(user => {                
                return user;
            }));
    }
    checkEmail(email:string){
        return this.http.post<any>(`${environment.apiUrl}/user/checkemail`, { email })
            .pipe(map(response => {                
                return response;
            }));
    }
    logout() {        
        this.cleanLocalStorage();
        this.authenticated = false;
        this.currentUser.next(null);
    }
    setUser(actUser): any {
        this.cleanLocalStorage();
        const newUser = new User(actUser);
        localStorage.setItem(this.userKey, JSON.stringify(newUser));
        this.currentUser.next(newUser);        
    }
    cleanLocalStorage() : void{
        localStorage.removeItem('currentUser');        
    }
    checkAutenticated(): Observable<boolean>
    {
        if ( this.authenticated )
        {
            return of(true);
        } 
        else
        {
            return of(false);
        }       
    }    
    checkAutenticatedFunction() : boolean{
        return this.authenticated; 
    }
    
}