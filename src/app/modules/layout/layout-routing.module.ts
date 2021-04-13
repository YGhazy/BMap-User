import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { ServiceComponent } from '../service/service.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {

    path: '', component: LayoutComponent, children: [

      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'service', component: ServiceComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' } 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
