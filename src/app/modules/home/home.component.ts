import { Component, OnInit, ViewChild } from '@angular/core'; //View Child for accessing children components
import { Router } from '@angular/router';
import { CreateNewsletterSubscription } from 'src/app/models/Request/create-newsletter-subscription';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  SubscribeForm;
  subscriptionRes: boolean;
  //Declare services
  constructor(private formBuilderHelper: formBuilderHelper, private router: Router, private newsletterService: NewsletterService) {
    this.SubscribeForm = this.formBuilderHelper.CreateFormBuilder({ email: '' })

  }

  ngOnInit(): void {
  }

  Subscribe() {
    var currentDate = new Date;
    const subscriptionModel: CreateNewsletterSubscription = {
      email: this.SubscribeForm.value.email,
      subscriptionDate: currentDate
    }
    this.newsletterService.SubscribeNewsletter(subscriptionModel).subscribe(res => {
      if(res.succeeded){
        this.subscriptionRes = true;
      }
    }, error => {
      this.subscriptionRes = false;
      console.log(error);
    });
  }
}
