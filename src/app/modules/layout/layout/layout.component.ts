import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { langHelper } from 'src/app/services/utilities/language-helper';
import { AuthenticationService } from '../../../services/authentication.service';
import { ServicesService } from '../../../services/ServicesService';
import { JSInitializer } from '../../../services/utilities/javascript-initializer';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  initials
  langVar;
  currentLang;
  ServicesList;
  user;
  hadImg: boolean
  isLoading: boolean = true
  isAuthorized: boolean
  constructor(private auth: AuthenticationService, private jsLoader: JSInitializer, private router: Router, private langHelper: langHelper, private ServicesService: ServicesService) { }
  ngOnInit(): void {
    //lang var
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
    //js animation
    this.jsLoader.InitializeScript('jquery.sticky.js');
    this.jsLoader.InitializeMainScript();
    //authorization
    this.isAuthorized = this.auth.isAuthenticated()
    if (this.isAuthorized) {
      this.auth.GetAccountViaToken().subscribe(res => {
        this.user = res.data;
        console.log(this.user);
        if (this.user.image == null) {
         //initials for null images
        this.hadImg=false
        let userName = this.user.customer.first +' '+ this.user.customer.last
        this.initials = userName.split(" ").map(n => n[0]).join("").toUpperCase()
        }
        else this.hadImg = true
      }, error => {
        console.log(error);
      });

    }
    //
    

    console.log(this.isAuthorized)
    this.ServicesService.GetAllServices().subscribe(res => {
      this.ServicesList = res.data;
      console.log(this.ServicesList);
    }, error => {
      console.log(error);
    });

  }
  route(url) {

    if (url == this.router.url)
      window.scrollTo(0, 0)
    else
      this.router.navigateByUrl(url)
  }
  changeLanguage() {
    this.langHelper.switchLanguage()
    this.langVar = this.langHelper.initializeMode();
    window.location.reload()
  }

  ToService(selectedServiceID) {
    localStorage.setItem('selectedServiceID', selectedServiceID)
    if (this.router.url !="/service")
    this.router.navigateByUrl('service')
    else
      window.location.reload()
    console.log(this.router.url)
  }
  logout() {
    this.auth.logout()
    window.location.reload()
  }
}
