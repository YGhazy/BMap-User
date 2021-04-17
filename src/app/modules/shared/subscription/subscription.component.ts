import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
import { NewsletterSubscription } from '../../../models/http-models/newsletter-subscription';
import { NewsletterService } from '../../../services/newsletter.service';
import { formBuilderHelper } from '../../../services/utilities/formBuilderHelper';
import { langHelper } from '../../../services/utilities/language-helper';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  SubscribeForm;
  isSucceeded: boolean = false;
  errorMsg: string = "";
  langVar;
  constructor(private formBuilderHelper: formBuilderHelper, private router: Router, private NewsletterService: NewsletterService, private langHelper: langHelper) {
    this.SubscribeForm = this.formBuilderHelper.CreateFormBuilder({ email: '' })

  }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode()
    console.log(this.langVar)
  }

  Subscribe() {
    this.errorMsg = "";
    const model: NewsletterSubscription = {
      email: this.SubscribeForm.value.email,
      subscriptionDate: new Date()
    }
    this.NewsletterService.SubscribeNewsletter(model).subscribe(res => {
      console.log(res.data);
      this.isSucceeded = true
      this.errorMsg = this.langVar.sent
      console.log(this.langVar.sent)
      console.log(this.errorMsg)
    }, error => {
      console.log(error);
        this.errorMsg = this.langVar.subscribe.subscribed
    });
  }

  get f() {
    return this.SubscribeForm.controls;
  }
}
