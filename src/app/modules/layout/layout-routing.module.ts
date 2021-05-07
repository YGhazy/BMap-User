import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { ContactComponent } from '../contact/contact.component';
import { CreditCardsComponent } from '../credit-cards/credit-cards.component';
import { HomeComponent } from '../home/home.component';
import { InvestmentsComponent } from '../investments/investments.component';
import { LoansComponent } from '../loans/loans.component';
import { OffersComponent } from '../offers/offers.component';
import { PersonalLoansComponent } from '../personal-loans/personal-loans.component';
import { ProfileComponent } from '../profile/profile.component';
import { RequestsComponent } from '../requests/requests.component';
import { ServiceComponent } from '../service/service.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {

    path: '', component: LayoutComponent, children: [

      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'Loans', component: LoansComponent },
      { path: 'personal-Loans', component: PersonalLoansComponent },
      { path: 'investment', component: InvestmentsComponent },
      { path: 'credit-cards', component: CreditCardsComponent },
      { path: 'Accounts', component: AccountsComponent },
      { path: 'Offers', component: OffersComponent },
      //{ path: 'profile', component: ProfileComponent},
      //{ path: 'requested-services', component: RequestsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' } 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
