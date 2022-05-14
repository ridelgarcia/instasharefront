import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Node } from 'app/_models/node.model';

@Injectable({ providedIn: 'root' })
export class StorageService {

    private currentPath : string;

    constructor(private _http: HttpClient,
        private _auth: AuthService) {
            this.currentPath = "/";
    }

    getCurrentPathContent() {
        return this._http.post<Node[]>(`${environment.apiUrl}/storage/navigate`, {
            userId:this._auth.currentUserValue.id,
            path:this.currentPath
        })
            .pipe(map(list => {                
                return list;
            }));
    }
}