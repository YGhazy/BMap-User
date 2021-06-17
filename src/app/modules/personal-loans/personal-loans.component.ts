import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/ServicesService';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-personal-loans',
  templateUrl: './personal-loans.component.html',
  styleUrls: ['./personal-loans.component.scss']
})
export class PersonalLoansComponent implements OnInit {

  currentLang;
  langVar;
  Service;
  constructor(private langHelper: langHelper, private ServicesService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.Service)
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;

    this.ServicesService.GetPersonalLoansService().subscribe(res => {
      this.Service = res.data;
      console.log(this.Service);
    }, error => {
      console.log(error);
    });

  }
  routeToOffer(typeID) {
    localStorage.setItem('serviceID', this.Service.id)
    localStorage.setItem('serviceNameEN', this.Service.nameEN)
    localStorage.setItem('serviceNameAR', this.Service.nameAR)
    localStorage.setItem('typeID', typeID)
    console.log("type", typeID)
    window.scroll(0, 0)
    this.router.navigateByUrl('/Offers')
  }
}
