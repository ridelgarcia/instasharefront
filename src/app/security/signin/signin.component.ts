import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/_services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {  

  signInForm: FormGroup;
  showAlert: boolean = false;
  userCreds : any =  {
    email : "",
    password : ""
  };

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router) {
      
    }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      inputemail     : ['', [Validators.required, Validators.email]],
      inputpassword  : ['', Validators.required]
      
  });
  }
  signIn(): void
    {
      console.log(this.userCreds);
        if ( this.signInForm.invalid )
        {
            return;
        }

        
        this.signInForm.disable();

        
        this.showAlert = false;

        this.userCreds.email = this.signInForm.controls.inputemail.value;
        this.userCreds.password = this.signInForm.controls.inputpassword.value;
        console.log(this.userCreds);
        this._authService.login(this.userCreds)
        .pipe(first())
        .subscribe(
            loginresponse => {  
              console.log(loginresponse);              
                if(this._authService.checkAutenticatedFunction()){
                    console.log(loginresponse);

                }
                else{
                  console.log("login failed");
                    this.loginFailed();
                }

            },
            error => {
                
                this.loginFailed()
    });            
  }
  loginFailed():void{    
    this.signInForm.enable();
    this.signInForm.reset();  
    
}
signUp(): void{
  this._router.navigate(['signup']);
}
}
