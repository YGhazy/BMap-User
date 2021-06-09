import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Service } from 'src/app/models/http-models/service';
import { ServicesService } from 'src/app/services/ServicesService';
import { langHelper } from '../../../services/utilities/language-helper';

@Component({
  selector: 'app-service-slider',
  templateUrl: './service-slider.component.html',
  styleUrls: ['./service-slider.component.scss']
})
export class ServiceSliderComponent implements OnInit {

  serviceList: Array<Service> = new Array<Service>();

  firstService: Service = new Service;
  secondService: Service = new Service;
  thirdService: Service = new Service;
  fourthService: Service = new Service;
  fifthService: Service = new Service;
  sixthService: Service = new Service;
  seventhService: Service = new Service;


  langVar;
  currentLang
  //Carousel options
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

  //Declare services
  constructor(private langHelper: langHelper,private router: Router, private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.FetchServices();
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
  }
  routeTo(service){
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
  FetchServices() {

    //this.servicesService.GetAllServices().subscribe(res => {
    //  if(res.succeeded){
    //    this.serviceList = res.data;
    //    console.log(this.serviceList);
    //  }
    //},error => {
    //  console.log(error);
    //});

    this.firstService.id = 1;
    this.firstService.nameEN = "Credit Cards";
    this.firstService.nameAR = "بطاقات الائتمان";
    this.firstService.descriptionEN = " Lorem Ipsum";
    this.firstService.descriptionAR = " ضصثضصثضصثضص";
    this.firstService.descriptionAR = " ضصثضصثضصثضص";
    this.firstService.icon = "../../../../assets/images/landing/CreditCards.png";

    this.secondService.id = 2;
    this.secondService.nameEN = "Personal Loans";
    this.secondService.nameAR = "قروض شخصية";
    this.secondService.descriptionEN = " Lorem Ipsum";
    this.secondService.descriptionAR = " ضصثضصثضصثضص";
    this.secondService.descriptionAR = " ضصثضصثضصثضص";
    this.secondService.icon = "../../../../assets/images/landing/PersonalLoans.png";

    this.thirdService.id = 3;
    this.thirdService.nameEN = "Loans";
    this.thirdService.nameAR = "القروض";
    this.thirdService.descriptionEN = " Lorem Ipsum";
    this.thirdService.descriptionAR = " ضصثضصثضصثضص";
    this.thirdService.descriptionAR = " ضصثضصثضصثضص";
    this.thirdService.icon = "../../../../assets/images/landing/Loans.png";

    this.fourthService.id = 4;
    this.fourthService.nameEN = "Investments";
    this.fourthService.nameAR = "الاستثمارات";
    this.fourthService.descriptionEN = " Lorem Ipsum";
    this.fourthService.descriptionAR = " ضصثضصثضصثضص";
    this.fourthService.descriptionAR = " ضصثضصثضصثضص";
    this.fourthService.icon = "../../../../assets/images/landing/Investments.png";

    this.fifthService.id = 5;
    this.fifthService.nameEN = "Accounts";
    this.fifthService.nameAR = "حسابات";
    this.fifthService.descriptionEN = " Lorem Ipsum";
    this.fifthService.descriptionAR = " ضصثضصثضصثضص";
    this.fifthService.descriptionAR = " ضصثضصثضصثضص";
    this.fifthService.icon = "../../../../assets/images/landing/Accounts.png";

    this.sixthService.id = 5;
    this.sixthService.nameEN = "Corporate";
    this.sixthService.nameAR = "الشركات";
    this.sixthService.descriptionEN = " Lorem Ipsum";
    this.sixthService.descriptionAR = " ضصثضصثضصثضص";
    this.sixthService.descriptionAR = " ضصثضصثضصثضص";
    this.sixthService.icon = "../../../../assets/images/icons/Flat.png";

    this.seventhService.id = 5;
    this.seventhService.nameEN = "Islamic Solutions";
    this.seventhService.nameAR = "الخدمات الاسلامية";
    this.seventhService.descriptionEN = " Lorem Ipsum";
    this.seventhService.descriptionAR = " ضصثضصثضصثضص";
    this.seventhService.descriptionAR = " ضصثضصثضصثضص";
    this.seventhService.icon = "../../../../assets/images/icons/credit-card-payment.png";

    this.serviceList.push(this.seventhService);
    this.serviceList.push(this.sixthService);
    this.serviceList.push(this.fifthService);
    this.serviceList.push(this.fourthService);
    this.serviceList.push(this.thirdService);
    this.serviceList.push(this.secondService);
    this.serviceList.push(this.firstService);

  }

}
