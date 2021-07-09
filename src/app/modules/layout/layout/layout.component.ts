import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ErrorType } from 'src/app/enums/error-type';
import { SearchResult } from 'src/app/models/http-models/search-result';
import { ServiceType } from 'src/app/models/http-models/service-type';
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
  ServicesList: any[];
  user;
  hadImg: boolean
  isLoading: boolean = true
  isAuthorized: boolean
  //Search var
  searchKeyword: string;
  searchResult: SearchResult;
  canViewSearchResults: boolean = false;

  constructor(private auth: AuthenticationService, private jsLoader: JSInitializer, private router: Router, private langHelper: langHelper, private ServicesService: ServicesService) { }
  ngOnInit(): void {
    //set navigation arrow
    this.ClearNavigationHighLight();
    var currentUrl = this.router.url.toString();
    currentUrl = currentUrl.replace("/", "");

    if (document.getElementById(currentUrl) != null)
      document.getElementById(currentUrl)?.classList.add('highlighted'); // Append Selected class to clicked element
    //
    setTimeout(() => {
      window.scroll(0, 0);
    }, 500);
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
          this.hadImg = false
          //let userName = this.user.customer.first + ' ' + this.user.customer.last
          //this.initials = userName.split(" ").map(n => n[0]).join("").toUpperCase()
        }
        else this.hadImg = true
      }, error => {
        console.log(error);
      });
    }

    this.ServicesService.GetAllServices().subscribe(res => {
      this.ServicesList = res.data;
      this.ServicesList = this.ServicesList.filter(s => s.nameEN != "Personal Loans");
      this.ServicesList = this.ServicesList.filter(s => s.nameEN != "Loans");
      console.log(this.ServicesList);
    }, error => {
      console.log(error);
    });
  }


  Search() {
    console.log(this.searchKeyword)
    if (this.searchKeyword) {
      this.ServicesService.Search(this.searchKeyword).subscribe(res => {
        if (res.succeeded) {
          if (res.errorType == ErrorType.NoResultsFound) {
            this.canViewSearchResults = false;
            return;
          }
          this.searchResult = res.data;
          console.log(this.searchResult);
          this.canViewSearchResults = true;
        }
      }, error => {

      });
    }
    else {
      return;
    }
  }

  fetchedTypes: any[] = [];
  RouteToSearchResult(result) {
    if (result.rate) {
      console.log(result.serviceTypesId)
      localStorage.setItem('typeID', result.serviceTypesId)

      this.ServicesList.forEach(element => {
        if (element.serviceTypes && element.serviceTypes.length > 0)
          this.fetchedTypes.push(
            element.serviceTypes
          );
      });

      console.log(this.fetchedTypes[0]);
      var offerServiceID;
      console.log(this.fetchedTypes[0].find(t => t.id == result.serviceTypesId))
      offerServiceID = this.fetchedTypes[0].find(t => t.id == result.serviceTypesId).servicesId;
      this.searchKeyword = "";
      this.canViewSearchResults = false;
      this.fetchedTypes = [];
      localStorage.setItem('serviceID', offerServiceID);
      if (this.router.url == '/Offers')
        location.reload()
      this.router.navigateByUrl('/Offers')
    }
    else {
      localStorage.setItem('typeID', result.serviceTypesId)
      var service = this.ServicesList.find(s => s.id == result.servicesId);
      this.RouteToService(service.nameEN);
      this.searchKeyword = "";
      this.canViewSearchResults = false;
      this.fetchedTypes = [];
    }
  }

  route(url) {
    if (url == this.router.url) {
      window.scrollTo(0, 0)
    }
    else {
      this.router.navigateByUrl(url)
    }
    this.ClearNavigationHighLight();
    document.getElementById(url)?.classList.add('highlighted');
    var currentUrl = this.router.url.toString();
    currentUrl = currentUrl.replace("/", "");
  }

  changeLanguage() {
    this.langHelper.switchLanguage()
    this.langVar = this.langHelper.initializeMode();
    window.location.reload()
  }

  logout() {
    this.auth.logout()
    if (this.router.url != "/home")
      this.router.navigateByUrl('/home');
    window.location.reload();
  }

  //Clear Highlighted class from navigation items
  ClearNavigationHighLight() {
    var nav_link = document.getElementsByClassName("nav-link"); // Fetch header list
    // Clear 'selected' class
    for (let i = 0; i < nav_link.length; i++) {
      if (nav_link[i]?.classList.contains('highlighted')) {
        nav_link[i]?.classList.remove('highlighted')
      }
    }
  }

  RouteToService(service) {
    if (service.nameEN == 'Accounts')
      this.router.navigateByUrl('/Accounts')
    else if (service.nameEN == 'Personal Loans')
      this.router.navigateByUrl('/personal-Loans')
    else if (service.nameEN == 'Credit Cards')
      this.router.navigateByUrl('/credit-cards')
    else if (service.nameEN == 'Loans')
      this.router.navigateByUrl('/Loans')
    else if (service.nameEN == 'Investments')
      this.router.navigateByUrl('/investment')
    else if (service.nameEN == 'Islamic Solutions')
      this.router.navigateByUrl('/islamic-solutions')
    else if (service.nameEN == 'Corporate')
      this.router.navigateByUrl('/corporate-banks')
  }


  routeToOffer(Service, typeID) {

    localStorage.setItem('serviceID', Service.id)
    localStorage.setItem('serviceNameEN', Service.nameEN)
    localStorage.setItem('serviceNameAR', Service.nameAR)
    localStorage.setItem('typeID', typeID)
    console.log("type", typeID)
    window.scroll(0, 0)
    if (this.router.url == '/Offers')
      location.reload()
    this.router.navigateByUrl('/Offers')
  }

}
// DownloadPDF(event) {

//   const linkSource = this.jobApplicationToDownloadDDF.cv;
//   const downloadLink = document.createElement("a");
//   const fileName = "CV.pdf";

//   downloadLink.href = linkSource;
//   downloadLink.download = fileName;
//   downloadLink.click();

// }
