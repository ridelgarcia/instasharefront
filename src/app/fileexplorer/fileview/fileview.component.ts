import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/_services/storage.service';
import { Node } from 'app/_models/node.model';
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
  
  constructor(private _storage:StorageService) { }

  ngOnInit(): void {
    this.nodeContent = new TableData();
    this.updateTableContent();
  }


  updateTableContent():void{
    this._storage.getCurrentPathContent().pipe().subscribe(
      response=>{
        this.nodeContent.dataRows = response;        
        console.log(this.nodeContent.dataRows);
    });
  }
}
