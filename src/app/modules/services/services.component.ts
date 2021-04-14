import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/ServicesService';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  ServicesList: any
  constructor(private ServicesService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.ServicesService.GetAllServices().subscribe(res => {
      this.ServicesList = res.data;
      console.log(this.ServicesList);
    }, error => {
      console.log(error);
    });
  }

  ToService(selectedServiceID) {
    this.router.navigateByUrl('service')
    localStorage.setItem('selectedServiceID', selectedServiceID)
  }
}
