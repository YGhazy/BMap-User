import { Component, OnInit, ViewChild } from '@angular/core'; //View Child for accessing children components
import { Router } from '@angular/router';
import { NewsletterSubscription } from '../../models/http-models/newsletter-subscription';
import { NewsletterService } from '../../services/newsletter.service';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';
import { langHelper } from '../../services/utilities/language-helper';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  SubscribeForm;
  isSucceeded: boolean = false;
  errorMsg: string = "";
  langVar;
  //Declare services
  constructor(private formBuilderHelper: formBuilderHelper, private router: Router, private NewsletterService: NewsletterService, private langHelper: langHelper) {
    this.SubscribeForm = this.formBuilderHelper.CreateFormBuilder({ email: '' })

  }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode()
  }

  Subscribe() {
    this.errorMsg = "";
    const model: NewsletterSubscription = {
      email: this.SubscribeForm.value.email,
      subscriptionDate: new Date()
    }
    this.NewsletterService.SubscribeNewsletter(model).subscribe(res => {
      console.log (res.data);
      this.isSucceeded = true
      this.errorMsg="Sent successfuly"
    }, error => {
      console.log(error);
        this.errorMsg ="you are already subscribed to our newsletter !"
    });
  }

  get f() {
    return this.SubscribeForm.controls;
  }
}
