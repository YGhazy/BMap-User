import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/ServicesService';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  service;
  constructor(private ServicesService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    let selectedServcieID= localStorage.getItem('selectedServiceID');
    this.ServicesService.GetAllServices().subscribe(res => {
      let ServicesList = res.data;
      this.service = ServicesList.filter(a => a.id == parseInt(selectedServcieID))
      console.log(this.service);
    }, error => {
      console.log(error);
    });
  }

}
