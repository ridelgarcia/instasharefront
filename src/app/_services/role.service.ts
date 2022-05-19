import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class RoleService {

    constructor(private http: HttpClient) {
    }

    
    getDefaultRole() {
        return this.http.get<any>(`${environment.apiUrl}/role/getdefaultrole`, {})
            .pipe(map(role => {                
                return role;
            }));
    }
}