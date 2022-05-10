import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "app/_services";

@Injectable({ providedIn: 'root'})
export class RegisterHelper {

    constructor(private _authService:AuthService){

    }
    static confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!control.parent || !control) {
            return null;
        }

        const password = control.parent.get('inputpassword');
        const passwordConfirm = control.parent.get('inputpasswordconfirm');
        
        if (!password || !passwordConfirm) {
            return null;
        }

        if (passwordConfirm.value === '') {
            return null;
        }

        if (password.value === passwordConfirm.value) {
            return null;
        }

        return { 'passwordsnotmatching': true };
    }

    public emailValidator(control: AbstractControl) : ValidationErrors | null {
        var err : any;
        var value : string = control.value;
        var last = value.split('').pop();
        if(value.length === 1)
        {
          err  = {
            'email':true
          } 
          control.setErrors(err);
          return err;
        }  
        if(control.hasError('required') && !control.hasError('email') && value.length > 0)
          control.setErrors(null);       
        if(last  && !control.hasError('required') && !control.hasError('email') &&  last != '@')
        {
              this._authService.checkEmail(control.value)
              .pipe()              
              .subscribe((e) => {
                if(e.errorCode && e.errorCode == 1){
                  err  = {
                    'emailexist':true
                  } 
                  control.setErrors(err);
                }                           
              });
        }
        return err? err : null;     
    }
};