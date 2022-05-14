import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './mainpage/mainpage.component';
import { RouterModule } from '@angular/router';
import { LandingRoutes } from './landing.routing';
import { FileExplorerModule } from 'app/fileexplorer/fileexplorer.module';
@NgModule({
  
  imports: [
    CommonModule,
    FileExplorerModule,
    RouterModule.forChild(LandingRoutes),    
  ],
  declarations: [
    MainPageComponent
  ]
})
export class LandingModule { }
