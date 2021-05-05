import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './modules/register/register.component';

// Exported Routes for app-module router imports
export const routes: Routes = [


  //{ path: '', loadChildren: () => import('../app/modules/authentication/authentication.module').then(m => m.AuthenticationModule) },// Authentication module lazy loaded
  { path: 'main', loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule) },// Layout module lazy loaded
  //{ path: 'register', component: RegisterComponent },


  { path: '', redirectTo: '', pathMatch: 'full' }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
