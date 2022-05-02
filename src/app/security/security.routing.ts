import { Routes } from '@angular/router';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
export const SecurityRoutes: Routes = [
    { path: 'signin',      component: SignInComponent },
    { path: 'signup',      component: SignUpComponent },
];