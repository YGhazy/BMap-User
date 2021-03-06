import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Bank } from 'src/app/models/http-models/bank';
import { BankService } from 'src/app/services/bank.service';
import { langHelper } from '../../../services/utilities/language-helper';

@Component({
  selector: 'app-bank-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  //Models
  bankList: Bank[];
  langVar;
  currentLang
  ////Carousel options
  //carouselOptions: OwlOptions = {
  //  loop: true,
  //  mouseDrag: false,
  //  touchDrag: false,
  //  pullDrag: false,
  //  autoplay: true,
  //  dots: false,
  //  navSpeed: 700,
  //  navText: ['', ''],
  //  responsive: {
  //    0: {
  //      items: 1
  //    },
  //    400: {
  //      items: 2
  //    },
  //    740: {
  //      items: 3
  //    },
  //    940: {
  //      items: 5
  //    }
  //  },
  //  nav: false
  //}
  //Declare services
  constructor(private langHelper: langHelper,private router: Router, private bankService: BankService) { }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
    //fetch available banks
    //this.FetchBanks();
  }

  //FetchBanks(){
  //  this.bankService.GetAllBanks().subscribe(res => {
  //    if(res.succeeded){
  //      this.bankList = res.data;
  //      console.log(this.bankList);
  //    }
  //  },error => {
  //    console.log(error);
  //  });
  //}

  ////Route to item page via id
  //ViewItem(galleryItemId) {
  //  //Store id in local storage
  //  localStorage.setItem('galleryId', galleryItemId);
  //  this.router.navigate(['about-us']);
  //}



}
