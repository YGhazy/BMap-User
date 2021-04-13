import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild, CanActivate {

    role;
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (this.authService.isAuthenticated()) {
        console.log(this.router.url, " Authenticated") ;
        return true;
      }
        else
      {
          console.log(" Unauthenticated")
          this.router.navigate(['auth']);
          return false;
      }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (this.authService.isAuthenticated()) {
        console.log(this.router.url, " Authenticated");
        //if (this.router.url == '/auth/login') {
        //  this.router.navigate(['/Reports']);
        //}
        //this.router.navigate(['/Reports']);
        //  return false;
      }
      else {
          console.log("UnAuthenticated")
            return true;
      }
    }
}
