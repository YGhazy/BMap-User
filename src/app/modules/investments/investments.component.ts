import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/ServicesService';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {

  currentLang;
  langVar;
  Service;
  constructor(private langHelper: langHelper, private ServicesService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)

    console.log(this.Service)
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;

    this.ServicesService.GetInvestmentsService().subscribe(res => {
      this.Service = res.data
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
