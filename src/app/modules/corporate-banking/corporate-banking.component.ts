import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../../services/ServicesService';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-corporate-banking',
  templateUrl: './corporate-banking.component.html',
  styleUrls: ['./corporate-banking.component.scss']
})
export class CorporateBankingComponent implements OnInit {
  currentLang;
  langVar;
  Service;
  applicationForm
  selectedTime
  selectedNationality
  nationalityList = [
    { name: 'New York' },
    { name: 'Rome' },
    { name: 'London'},
    { name: 'Istanbul'},
    { name: 'Paris'}
  ];

  codes = [
    { code: '011' },
    { code: '012' },
    { code: '015' },

  ]

  @ViewChild('ApplyModal') public ApplyModal: ModalDirective;


  constructor(private langHelper: langHelper, private ServicesService: ServicesService, private router: Router,
    private formBuilderHelper: formBuilderHelper, private toastr: ToastrService) {
    this.applicationForm = this.formBuilderHelper.CreateFormBuilder({
      mobileNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      acknowledgment: ''
    });
  }


  ngOnInit(): void {
    console.log(this.Service)
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;

    this.ServicesService.GetAllServices().subscribe(res => {
      this.Service = res.data[3];
      console.log(this.Service);
    }, error => {
      console.log(error);
    });
  }

  ViewApply(typeID) {
    localStorage.setItem('serviceID', this.Service.id)
    localStorage.setItem('serviceNameEN', this.Service.nameEN)
    localStorage.setItem('serviceNameAR', this.Service.nameAR)
    localStorage.setItem('typeID', typeID)
    console.log("type", typeID)
    window.scroll(0, 0)
    this.ApplyModal.show()
  }

  Apply() {

    const createServiceRequest = {
      date: new Date(),
      bankName: "",
      offerTitle:"",
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
}
