import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationUser } from 'src/app/models/http-models/application-user';
import { Bank } from 'src/app/models/http-models/bank';
import { Service } from 'src/app/models/http-models/service';
import { ServiceType } from 'src/app/models/http-models/service-type';
import { CreateServiceRequest } from 'src/app/models/Request/service-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BankService } from 'src/app/services/bank.service';
import { formBuilderHelper } from 'src/app/services/utilities/formBuilderHelper';
import { ServicesService } from '../../services/ServicesService';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  service: Service;
  banks: Bank[];
  selectedServiceType: any = new String("");
  selectedBank: any = new String("");
  isRequestingService: boolean = false;
  clientDetails: ApplicationUser;
  applicationForm;

  constructor(private ServicesService: ServicesService, private bankService: BankService, private router: Router,
    private formBuilderHelper: formBuilderHelper, private authService: AuthenticationService, private toastr: ToastrService) {
    this.applicationForm = this.formBuilderHelper.CreateFormBuilder({
      mobileNumber: '',
      serviceType: '',
      bankName: '',
      note: '',
      acknowledgment: ''
    });
  }

  ngOnInit(): void {
    let selectedServiceID = localStorage.getItem('selectedServiceID');
    this.ServicesService.GetAllServices().subscribe(res => {
      let ServicesList = res.data;
      this.service = ServicesList.find(a => a.id == parseInt(selectedServiceID))
      // console.log(this.service);
    }, error => {
      console.log(error);
    });
    this.FetchUserDetails();
  }

  DisplayApplicationForm() {
    this.FetchAvailableBanks();
  }

  SelectItem(type: number, itemID: number) {
    if (type == 0) { // Service Types
      this.selectedServiceType = this.service.serviceTypes.find(t => t.id == itemID);
    }
    else { // bank
      this.selectedBank = this.banks.find(b => b.id == itemID);
    }
  }

  FetchAvailableBanks() {
    this.bankService.GetAllBanks().subscribe(res => {
      if (res.succeeded) {
        this.banks = res.data;
        this.isRequestingService = true; // display application form
      }
    }, error => {
      console.log(error);
    });
  }

  //Fetch user details via token
  FetchUserDetails() {
    this.authService.GetAccountViaToken().subscribe(res => {
      if (res.succeeded) {
        this.clientDetails = res.data;
      }
    }, error => {
      console.log(error);
    });
  }

  //Create service request
  SubmitServiceRequest() {
    var requestDate = new Date;
    const createServiceRequest: CreateServiceRequest = {
      date: requestDate,
      note: this.applicationForm.value.note,
      customerId: this.clientDetails.customer.id,
      banksId: this.selectedBank.id,
      serviceTypesId: this.selectedServiceType.id,
      servicesId: this.service.id
    }
    console.log(createServiceRequest);
    this.ServicesService.SubmitServiceRequest(createServiceRequest).subscribe(res => {
      if (res.succeeded) {
        this.toastr.success('Request sent', 'Success', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
        this.applicationForm.reset();
        setTimeout(() => {
          this.router.navigate(['/requested-services']);
        },1000);
      }
    }, error => {
      this.toastr.error('Failed to submit request', 'Error', {
        disableTimeOut: false,
        closeButton: true,
        positionClass: 'toast-top-center'
      });
      console.log(error);
    });
  }

  //Hide/show dropdown menu
  CloseDropDown(event){
    
  }
  get applicationFormControls() {
    return this.applicationForm.controls;
  }
}
