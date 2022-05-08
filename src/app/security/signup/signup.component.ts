import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/_services/auth.service';
import { RegisterHelper } from 'app/_helpers/register.helper';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm : FormGroup;

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      inputname     : ['', [Validators.required]],
      inputlastname     : ['', [Validators.required]],
      inputemail     : ['', [Validators.required, Validators.email]],
      inputpassword  : ['', Validators.required],
      inputpasswordconfirm  : ['', [Validators.required,RegisterHelper.confirmPasswordValidator]]
  });

  }
  signUp(){
    console.log("Signing Up ...");
  }
}
