import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/_services';
import { StorageService } from 'app/_services/storage.service';

@Component({
  selector: 'app-fileactions',
  templateUrl: './fileactions.component.html',
  styleUrls: ['./fileactions.component.css']
})
export class FileActionsComponent implements OnInit {

  createFolderForm : FormGroup;
  formVisible:boolean;
  constructor(private _formBuilder:FormBuilder,
    private _storage:StorageService,
    private _auth:AuthService) { }

  ngOnInit(): void {
    this.formVisible = false;
    this.createFolderForm = this._formBuilder.group({
      foldername     : ['', [Validators.required]]
      
  });
  }
  createfolderaction(){
    this.formVisible = !this.formVisible;
  }
  uploadfileaction(){
    console.log("upload file");
  }
  createfoldersubmit(){
    let folderName = this.createFolderForm.controls.foldername.value;
    this._storage.createFolder(folderName,this._auth.currentUserValue.id).pipe().subscribe(response =>{
      if(response.errorCode == 1){
        this.createFolderForm.controls.foldername.setErrors({
          exist:true
        });
      } else if(response.errorCode == 0)
        this.formVisible = !this.formVisible;
    },
    error=>{
      this.formVisible = !this.formVisible;
    }
    );
  }
  navigatetoparentaction(){
    this._storage.navigateToParent();
  }
}
