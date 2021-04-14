import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Service } from 'src/app/models/http-models/service';
import { ServicesService } from 'src/app/services/ServicesService';

@Component({
  selector: 'app-service-slider',
  templateUrl: './service-slider.component.html',
  styleUrls: ['./service-slider.component.scss']
})
export class ServiceSliderComponent implements OnInit {

  serviceList: Service[];

  //Carousel options
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
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
        items: 3
      }
    },
    nav: false
  }

  //Declare services
  constructor(private router: Router, private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.FetchServices();
  }

  FetchServices(){
    this.servicesService.GetAllServices().subscribe(res => {
      if(res.succeeded){
        this.serviceList = res.data;
        console.log(this.serviceList);
      }
    },error => {
      console.log(error);
    });
  }

}
