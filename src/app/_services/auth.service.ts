import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable ,of } from 'rxjs';
import {map, filter} from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;    
    private _authenticated: boolean = false;

    constructor(private http: HttpClient) {        
        localStorage.removeItem('currentUser');
        localStorage.removeItem('activeUser');
        localStorage.removeItem('accessToken');
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable().pipe(
            filter(x => x != null)
        );
    }
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
       return localStorage.getItem('accessToken') ?? '';
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(UserCreds) {
        return this.http.post<any>(`${environment.apiUrl}/user/signin`, UserCreds)
            .pipe(map(user => {
                const actUser = user;                
                if (actUser && actUser.token) {
                    this.setUser(actUser);
                    this._authenticated = true;
                }
                return user;
            }));
    }

    register(email: string, firstName: string, lastName: string, phone: string, password: string, companyName: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/register`, { email, firstName, lastName, phone, password, companyName })
            .pipe(map(user => {                
                return user;
            }));
    }

    logout() {        
        this.cleanLocalStorage();
        this._authenticated = false;
        this.currentUserSubject.next(null);
    }
    setUser(actUser): any {
        this.cleanLocalStorage();
        const newUser = new User(actUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('activeUser',JSON.stringify(actUser));
        this.accessToken = actUser.token;
        this.currentUserSubject = new BehaviorSubject<User>(newUser);
        this.currentUserSubject.next(newUser);
    }
    cleanLocalStorage() : void{
        localStorage.removeItem('currentUser');
        localStorage.removeItem('activeUser');
        localStorage.removeItem('accessToken');
    }
    checkAutenticated(): Observable<boolean>
    {
        if ( this._authenticated )
        {
            return of(true);
        } 
        else
        {
            return of(false);
        }       
    }    
    checkAutenticatedFunction() : boolean{
        return this._authenticated; 
    }
    
}