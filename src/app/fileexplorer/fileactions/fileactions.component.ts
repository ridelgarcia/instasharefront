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
  uploadFileForm : FormGroup;
  formVisibleCreateFolder:boolean;
  formVisibleUploadFile:boolean;
  constructor(private _formBuilder:FormBuilder,
    private _storage:StorageService,
    private _auth:AuthService) { }

  ngOnInit(): void {
    this.formVisibleCreateFolder = false;
    this.formVisibleUploadFile = false;
    this.uploadFileForm = this._formBuilder.group({
      file :[]
    });
    this.createFolderForm = this._formBuilder.group({
      foldername     : ['', [Validators.required]]
      
  });
  }
  createfolderaction(){
    this.formVisibleUploadFile = false;
    this.formVisibleCreateFolder = !this.formVisibleCreateFolder;
  }
  uploadfileaction(){
    this.formVisibleCreateFolder = false;
    this.formVisibleUploadFile = !this.formVisibleUploadFile;
  }
  createfoldersubmit(){
    let folderName = this.createFolderForm.controls.foldername.value;
    this._storage.createFolder(folderName,this._auth.currentUserValue.id).pipe().subscribe(response =>{
      if(response.errorCode == 1){
        this.createFolderForm.controls.foldername.setErrors({
          exist:true
        });
      } else if(response.errorCode == 0)
        this.formVisibleCreateFolder = !this.formVisibleCreateFolder;
    },
    error=>{
      this.formVisibleCreateFolder = !this.formVisibleCreateFolder;
    }
    );
  }
  navigatetoparentaction(){
    this._storage.navigateToParent();
  }
  onFileSelected(event){
    let file:File = event.target.files[0];
    if(file){
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
      console.log(fileReader.result);
      this._storage.uploadFile(fileReader.result,file.name,this._auth.currentUserValue.id).pipe().subscribe(response=>{
        console.log(response);
      });
    }
    fileReader.readAsBinaryString(file);
      
    }
    
  }
}
