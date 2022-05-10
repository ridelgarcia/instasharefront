import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/_services/auth.service';
import { RegisterHelper } from 'app/_helpers/register.helper';
import { RoleService } from 'app/_services/role.service';
import { showNotification } from 'app/_helpers/notifications.helper';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm : FormGroup;

  constructor(private _authService: AuthService,
    private _registerHelper : RegisterHelper,
    private _roleService:RoleService,
    private _formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      inputname     : ['', [Validators.required]],
      inputlastname     : ['', [Validators.required]],
      inputemail     : ['', [Validators.required, Validators.email,this._registerHelper.emailValidator.bind(this._registerHelper)]],
      inputpassword  : ['', Validators.required],
      inputpasswordconfirm  : ['', [Validators.required,RegisterHelper.confirmPasswordValidator]]
  });

  }
  signUp(){
    this.signUpForm.updateValueAndValidity();
    if(this.signUpForm.invalid)
      return;
    this._roleService.getDefaultRole().pipe().subscribe(
      role => {
        var name = this.signUpForm.controls.inputname.value;
        var lastname = this.signUpForm.controls.inputlastname.value;
        var email = this.signUpForm.controls.inputemail.value;
        var password = this.signUpForm.controls.inputpassword.value;
        this._authService.signup(name,lastname,email,password,role).pipe().subscribe(
          user =>{
            this._authService.login(email,password).pipe().subscribe(
              loginresponse => {
                if(this._authService.checkAutenticatedFunction())
                  this._router.navigate(['workspace']);
              },
              error => {
                this.signUpFailed();
              }              
            );
          },
          error => {
            this.signUpFailed();
          }
        );
      },
      error => {
        this.signUpFailed();
      }      
    );
  }

  signUpFailed(){
    showNotification('top','center','danger','Error requesting the signup','pe-7s-attention');
  }
}
