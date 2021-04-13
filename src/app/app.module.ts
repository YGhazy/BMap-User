import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Http client module import
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // FormGroup and Validation module import
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module'; // Default Angular Routing module
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ServiceComponent } from './modules/service/service.component';
import { ContactComponent } from './modules/contact/contact.component';
import { RegisterComponent } from './modules/register/register.component';
import { TokenInterceptor } from './services/http-services/token-interceptor';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    FormsModule,
    RouterModule,
    LayoutModule, // Layout Module imported
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SlickCarouselModule, // Slick Carousel import
    RouterModule.forRoot(routes, { useHash: true }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://localhost:4200"],
      },
    }),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
