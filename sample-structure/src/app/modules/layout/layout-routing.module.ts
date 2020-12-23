import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { HomeComponent } from '../home/home.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    //Empty path will be automatically redirected to from app-routing module.
    //Children modules/components are declared here.
    path: '', component: LayoutComponent, children: [

      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' } //default redirect to desired child component on routing module call
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
