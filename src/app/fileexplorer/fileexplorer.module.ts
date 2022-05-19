import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FileViewComponent } from './fileview/fileview.component';
import { FileActionsComponent } from './fileactions/fileactions.component';
import { FileExplorerComponent } from './fileexplorer/fileexplorer.component';



@NgModule({
  declarations: [FileViewComponent, FileActionsComponent, FileExplorerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[FileViewComponent, 
    FileActionsComponent,
    FileExplorerComponent
  ]
})
export class FileExplorerModule { }
