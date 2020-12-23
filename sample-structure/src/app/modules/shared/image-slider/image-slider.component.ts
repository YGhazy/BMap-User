import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryItem } from '../../../models/http-models/gallery-item';
import { GalleryItemService } from '../../../services/gallery-item-service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  //Models
  galleryItems: Array<GalleryItem> = new Array<GalleryItem>();

  //Carousel options
  slideConfig = {
    centerMode: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    arrows: true,
    dots: false,
    swipe: true,
    autoplaySpeed: 2000,
    //responsive: [
    //  {
    //    breakpoint: 900,
    //    settings: {
    //    }
    //  }
    //]
  };

  //Declare services
  constructor(private router: Router, private GalleryService: GalleryItemService) { }


  ngOnInit(): void {

    //Fetch Slider objects Via Observable (Http-request)
    //this.GalleryService.GetGalleryItems().subscribe(res => {
    //  if (res.succeeded) { // API method sucessful
    //    this.galleryItems = res.data;
    //  }
    //}, error => {
    //  const errors: string[] = error.error.errors[0];
    //});

    //Dummy Content Filled for static purposes
    this.galleryItems = [
      {
        id: 0,
        title: 'Bolt Solutions #1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imagePath: '2b5295b3e047b2324d0d1f2e75dee684.jpg'
      },
      {
        id: 1,
        title: 'Bolt Solutions #2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imagePath: '2b5295b3e047b2324d0d1f2e75dee684.jpg'
      },
      {
        id: 2,
        title: 'Bolt Solutions #3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imagePath: '2b5295b3e047b2324d0d1f2e75dee684.jpg'
      },
      {
        id: 3,
        title: 'Bolt Solutions #4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imagePath: '2b5295b3e047b2324d0d1f2e75dee684.jpg'
      },
      {
        id: 4,
        title: 'Bolt Solutions #5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imagePath: '2b5295b3e047b2324d0d1f2e75dee684.jpg'
      }
    ];
  }

  //Route to item page via id
  ViewItem(galleryItemId) {
    //Store id in local storage
    localStorage.setItem('galleryId', galleryItemId);
    this.router.navigate(['about-us']);
  }
}
