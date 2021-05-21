import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CreateServiceRequest } from '../../models/Request/service-request';
import { ServicesService } from '../../services/ServicesService';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {  

  currentLang;
  langVar;
  ServiceTypes;
  ServiceType;
  serviceNameEN
  serviceNameAR
  currentOffer 
  @ViewChild('ApplyModal') public ApplyModal: ModalDirective;
  applicationForm;

  constructor(private toastr: ToastrService,private langHelper: langHelper, private ServicesService: ServicesService, private router: Router, private formBuilderHelper: formBuilderHelper,) {
    this.applicationForm = this.formBuilderHelper.CreateFormBuilder({
      mobileNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      acknowledgment: ''
    });
  }

  ngOnInit(): void {
    let currentSeriveid = localStorage.getItem('serviceID')
    this.serviceNameEN = localStorage.getItem('serviceNameEN')
    this.serviceNameAR = localStorage.getItem('serviceNameAR')
    let currentTypeID = localStorage.getItem('typeID')
    console.log(currentSeriveid, currentTypeID)
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;

    this.ServicesService.GetServiceTypesById(parseInt(currentSeriveid)).subscribe(res => {
      this.ServiceTypes = res.data;
      console.log(this.ServiceTypes);
      this.ServiceType = this.ServiceTypes.find(a => a.id == parseInt(currentTypeID))
      console.log(this.ServiceType);
    }, error => {
      console.log(error);
    });

  }

  Apply() {

    const createServiceRequest: CreateServiceRequest = {
      date: new Date(),
      bankName: this.currentOffer.bankName,
      offerTitle: this.currentOffer.nameEN,
      firstName: this.applicationForm.value.firstName,
      lastName: this.applicationForm.value.lastName,
      email: this.applicationForm.value.email,
      phoneNumber: this.applicationForm.value.mobileNumber,
      status: "",
    }
   
    console.log(createServiceRequest);
    this.ServicesService.SubmitServiceRequest(createServiceRequest).subscribe(res => {
      if (res.succeeded) {
        this.toastr.success(this.langVar.response.reqSent, this.langVar.response.success, {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
        this.applicationForm.reset();
        this.ApplyModal.hide()
      }
    }, error => {
      this.toastr.error(this.langVar.response.failedToSubmitreq, this.langVar.response.error, {
        disableTimeOut: false,
        closeButton: true,
        positionClass: 'toast-top-center'
      });
      console.log(error);
    });
  }

  get applicationFormControls() {
    return this.applicationForm.controls;
  }
  routeToOffer(typeID) {
    localStorage.setItem('typeID', typeID)
    this.ngOnInit()
  }

  showApplyModal(offer) {
    this.currentOffer = offer
    console.log(this.currentOffer)
    this.ApplyModal.show()
  }

}
