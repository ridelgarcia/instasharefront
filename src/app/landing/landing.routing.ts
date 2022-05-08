import { Routes } from '@angular/router';

import { MainPageComponent } from './mainpage/mainpage.component'
import { AuthenticatedGuard } from 'app/_services/guards/authenticated.guard';
export const LandingRoutes: Routes = [
    { 
        path: '',
        canActivate:[AuthenticatedGuard],
        canActivateChild:[AuthenticatedGuard],
        component: MainPageComponent
    },
    
];