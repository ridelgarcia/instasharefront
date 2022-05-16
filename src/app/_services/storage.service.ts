import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {map} from 'rxjs/operators';
import { Node } from 'app/_models/node.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StorageService {

    private currentPath : BehaviorSubject<string>;

    constructor(private _http: HttpClient) {
            this.currentPath = new BehaviorSubject<string>("/");
            
    }
    getCurrentPathContent(userId:string) {
        return this._http.post<Node[]>(`${environment.apiUrl}/storage/navigate`, {
            userId:userId,
            path:this.currentPath.value
        })
            .pipe(map(list => {                
                return list;
            }));
    }
    createFolder(folderName:string,userId:string){
        return this._http.put<any>(`${environment.apiUrl}/storage/createfolder`, {
            userId:userId,
            path:this.currentPath.value,
            folderName:folderName
        })
            .pipe(map(response => { 
                let current = this.currentPath.value;
                this.currentPath.next(current);               
                return response;
            }));
    }

    navigateToChild(folderName:string){
        let current = this.currentPath.value;
        if(current !="/")
            this.currentPath.next(current + "/"+folderName);
        else
            this.currentPath.next(current + folderName);
    }
    navigateToParent(){
        if(this.currentPath.value != "/"){            
            let index = this.currentPath.value.lastIndexOf("/");            
            if(index == 0)
                index = 1;
            let parentPath = this.currentPath.value.substring(0,index);
            this.currentPath.next(parentPath);
        }
    }
    uploadFile(data:string | ArrayBuffer,name:string,userId:string){
        return this._http.put<any>(`${environment.apiUrl}/storage/uploadfile`, {
            userId:userId,
            path:this.currentPath.value,
            data:data,
            name:name
        })
    }
    getObserverOfCurrentPath():Observable<string>{
        return this.currentPath.asObservable();
    }
    getCurrentPathValue():string{
        return this.currentPath.value;
    }
}