import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './_services/guards/authenticated.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'signin',    
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    canActivateChild: [AuthenticatedGuard],
    component: AdminLayoutComponent,
    data: {
        
    },
    children: [
        {
            path: 'workspace',
            loadChildren: () =>
                import('app/landing/landing.module').then(
                    (m) => m.LandingModule
                ),
        }
      ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
