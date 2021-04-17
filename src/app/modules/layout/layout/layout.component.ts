import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { langHelper } from 'src/app/services/utilities/language-helper';
import { ServicesService } from '../../../services/ServicesService';
import { JSInitializer } from '../../../services/utilities/javascript-initializer';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  langVar;
  currentLang;
  ServicesList;
  isLoading: boolean=true
  constructor(private jsLoader: JSInitializer,private router: Router, private langHelper: langHelper, private ServicesService: ServicesService) { }
  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();

    this.jsLoader.InitializeScript('jquery.sticky.js');
    this.jsLoader.InitializeMainScript();

    this.currentLang = this.langHelper.currentLang;

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
}
