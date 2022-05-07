import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './mainpage/mainpage.component';
import { RouterModule } from '@angular/router';
import { LandingRoutes } from './landing.routing';

@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forChild(LandingRoutes),    
  ],
  declarations: [
    MainPageComponent
  ]
})
export class LandingModule { }
