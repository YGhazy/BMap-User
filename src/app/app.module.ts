import { HttpClientModule } from '@angular/common/http'; // Http client module import
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // FormGroup and Validation module import
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module'; // Default Angular Routing module
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreditCardsComponent } from './modules/credit-cards/credit-cards.component';
import { PersonalLoansComponent } from './modules/personal-loans/personal-loans.component';
import { LoansComponent } from './modules/loans/loans.component';
import { AccountsComponent } from './modules/accounts/accounts.component';
import { InvestmentsComponent } from './modules/investments/investments.component';


@NgModule({
  declarations: [
    AppComponent,
    CreditCardsComponent,
    PersonalLoansComponent,
    LoansComponent,
    AccountsComponent,
    InvestmentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    LayoutModule, // Layout Module imported
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SlickCarouselModule, // Slick Carousel import
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
