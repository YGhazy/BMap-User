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

  ngOnInit(): void {
  }

}
