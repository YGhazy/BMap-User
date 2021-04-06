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


@NgModule({
  declarations: [LayoutComponent, HomeComponent, ServiceComponent,
    ContactComponent,
    RegisterComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
