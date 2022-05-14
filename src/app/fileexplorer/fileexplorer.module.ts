import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileViewComponent } from './fileview/fileview.component';
import { FileActionsComponent } from './fileactions/fileactions.component';
import { FileExplorerComponent } from './fileexplorer/fileexplorer.component';



@NgModule({
  declarations: [FileViewComponent, FileActionsComponent, FileExplorerComponent],
  imports: [
    CommonModule
  ],
  exports:[FileViewComponent, 
    FileActionsComponent,
    FileExplorerComponent
  ]
})
export class FileExplorerModule { }
