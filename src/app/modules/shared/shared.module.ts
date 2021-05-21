import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ServiceSliderComponent } from './service-slider/service-slider.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { RecommendedServicesSliderComponent } from './recommended-services-slider/recommended-services-slider.component';
import { SpecificFeaturesComponent } from './specific-features/specific-features.component';
import { OwlModule } from 'ngx-owl-carousel';

//Shared Components and imported modules between the project are imported here
//Components that shall be re-used between modules should be exported.
@NgModule({
  declarations: [
    ModalComponent,
    ImageSliderComponent,
    ServiceSliderComponent,
    SubscriptionComponent,
    RecommendedServicesSliderComponent,
    SpecificFeaturesComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarouselModule,
    OwlModule,
    ModalModule.forRoot()
  ]
  , exports: [
    ModalComponent,
    ImageSliderComponent,
    ServiceSliderComponent,
    SubscriptionComponent,
    RecommendedServicesSliderComponent,
    SpecificFeaturesComponent
    ]
})
export class SharedModule { }
