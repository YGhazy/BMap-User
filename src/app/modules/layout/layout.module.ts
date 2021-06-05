import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ModalModule } from 'ngx-bootstrap/modal';
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
import {CalendarModule} from 'primeng/calendar';
import { OffersComponent } from '../offers/offers.component';
import { PersonalLoansComponent } from '../personal-loans/personal-loans.component';
import { LoansComponent } from '../loans/loans.component';
import { CreditCardsComponent } from '../credit-cards/credit-cards.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { InvestmentsComponent } from '../investments/investments.component';
import { CorporateBankingComponent } from '../corporate-banking/corporate-banking.component';
import { IslamicSolutionsComponent } from '../islamic-solutions/islamic-solutions.component';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [LayoutComponent, HomeComponent, ServiceComponent,
    ContactComponent, RequestsComponent, OffersComponent, CreditCardsComponent,
    PersonalLoansComponent,
    LoansComponent,
    AccountsComponent,
    InvestmentsComponent,
    CorporateBankingComponent,
    IslamicSolutionsComponent,
    RegisterComponent, AboutUsComponent, ProfileComponent],
  imports: [
    ModalModule.forRoot(),
    BrowserModule, 
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    LayoutRoutingModule,
    TableModule,
    CalendarModule,
    SharedModule,
    DropdownModule,
  ]
})
export class LayoutModule { }
