import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SecurityRoutes } from './security.routing';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './signup/signup.component';


@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    RouterModule.forChild(SecurityRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class SecurityModule { }
