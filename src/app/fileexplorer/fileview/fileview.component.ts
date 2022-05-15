import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/_services/storage.service';
import { Node } from 'app/_models/node.model';
import { AuthService } from 'app/_services';
export class TableData {
  headerRow: string[] = ['','Name','Created At','Modified At'];
  dataRows: Node[];
}

@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.css']
})
export class FileViewComponent implements OnInit {
  public nodeContent: TableData;
  public path:string;
  constructor(private _storage:StorageService,
    private _auth : AuthService) { }

  ngOnInit(): void {
    this.nodeContent = new TableData();
    this.updateTableContent();
    this._storage.getObserverOfCurrentPath().pipe().subscribe(change=>{
      this.updateTableContent();
    });
  }


  updateTableContent():void{
    let userId:string = this._auth.currentUserValue.id;
    this.path = this._storage.getCurrentPathValue();
    this._storage.getCurrentPathContent(userId).pipe().subscribe(
      response=>{
        this.nodeContent.dataRows = response;        
        console.log(this.nodeContent.dataRows);
    });
  }
  navigateTo(folderName:string){
    this._storage.navigateToChild(folderName);
  }
}
