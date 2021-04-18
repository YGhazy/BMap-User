import { Component, OnInit, ViewChild } from '@angular/core'; //View Child for accessing children components
import { Router } from '@angular/router';
import { NewsletterSubscription } from '../../models/http-models/newsletter-subscription';
import { NewsletterService } from '../../services/newsletter.service';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';
import { langHelper } from '../../services/utilities/language-helper';
import { ModalComponent } from '../shared/modal/modal.component';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  langVar;
  constructor(private formBuilderHelper: formBuilderHelper, private router: Router, private langHelper: langHelper) {

  }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode()
    //AOS.refresh();
    AOS.refresh({
 
      disable: 'mobile'

    });
  }


}
