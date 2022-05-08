import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class RegisterHelper {
    static confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!control.parent || !control) {
            return null;
        }

        const password = control.parent.get('inputpassword');
        const passwordConfirm = control.parent.get('inputpasswordconfirm');

        console.log(password.value);
        console.log(passwordConfirm.value);
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
};