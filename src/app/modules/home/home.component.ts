import { Component, OnInit, ViewChild } from '@angular/core'; //View Child for accessing children components
import { Router } from '@angular/router';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  SubscribeForm;
  //Declare services
  constructor(private formBuilderHelper: formBuilderHelper, private router: Router) {
    this.SubscribeForm = this.formBuilderHelper.CreateFormBuilder({ email: '' })

  }

  ngOnInit(): void {
  }

  Subscribe() {

  }
}
