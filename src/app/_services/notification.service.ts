import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "environments/environment";



export interface Message {
    action: number;
    content: any;
}


@Injectable({ providedIn: 'root' })
export class NotificationService {
    
    private ws : WebSocket;
    private subject : Subject<MessageEvent>;
    constructor() {
        console.log("constructor");
        this.subject = new Subject<MessageEvent>();       
        this.ws = new WebSocket(environment.wsUrl+"/notification");
        this.ws.onclose = event =>{
            this.closed(event);
        }
        this.ws.onmessage = event => {
            this.received(event);
        };
    }
    public openSessionForUser(userId:string){
        
        if(this.ws.readyState === WebSocket.OPEN){
            let content = {
                userId: userId 
            }
            let opensessionforuser : Message = {
                action: 0,
                content:content
            };            
            this.ws.send(JSON.stringify(opensessionforuser));

        }
        else
            console.log(this.ws.readyState);        
    }
    public getResponseSubject() : Subject<MessageEvent>{
        return this.subject;
    }
    private received(message: MessageEvent ){
        this.subject.next(message);
    }
    private closed(event){
        console.log(event);
    }
    ngOnDestroy(){
        console.log("destroyed");
    }
}