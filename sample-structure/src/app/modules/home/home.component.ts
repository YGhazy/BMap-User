import { Component, OnInit, ViewChild } from '@angular/core'; //View Child for accessing children components
import { Router } from '@angular/router';
import { content } from '../../models/http-models/content';
import { HomeService } from '../../services/home-service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Declare services
  constructor(private router: Router, private HomeService: HomeService) { }
  //Models and DTOs
  content: content;
  contents: Array<content> = new Array<content>();

  //Shared components declarations
  @ViewChild(ModalComponent) modal: ModalComponent;
  ngOnInit(): void {

    //Fetch Home Page Contents Via Observable (Http-request)
    //this.HomeService.GetHomePageContents().subscribe(res => {
    //  if (res.succeeded) { // API method sucessful
    //    this.content = res.data;
    //  }
    //}, error => {
    //  const errors: string[] = error.error.errors;
    //    this.modal.showFailModal(errors[0]); // Display Error PopUp
    //});

    //Dummy Content Filled for static purposes
    this.content = {
      id: 0,
      title: 'Bolt Solutions Front-End Layout',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, suscipit, rerum quos facilis repellat architecto commodi officia atque nemo facere eum non illo voluptatem quae delectus odit vel itaque amet.'
    }
  }

}
