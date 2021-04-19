import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ServiceComponent } from '../service/service.component';
import { ContactComponent } from '../contact/contact.component';
import { RegisterComponent } from '../register/register.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { BrowserModule } from '@angular/platform-browser';
import { RequestsComponent } from '../requests/requests.component';
import {TableModule} from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from '../profile/profile.component';

@NgModule({
  declarations: [LayoutComponent, HomeComponent, ServiceComponent,
    ContactComponent, RequestsComponent,
    RegisterComponent, AboutUsComponent, ProfileComponent],
  imports: [
    BrowserModule, 
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    LayoutRoutingModule,
    TableModule,
    SharedModule
  ]
})
export class LayoutModule { }
