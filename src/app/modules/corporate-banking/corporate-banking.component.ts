import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CorporateTypes } from '../../enums/CorporateTypes';
import { IslamicTypes } from '../../enums/IslamicTypes';
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
  applicationForm
  selectedTime
  selectedType
  selectedCode

  typesEnum = IslamicTypes

  selectedNationality
  nationalityList = [
    { name: 'New York' },
    { name: 'Rome' },
    { name: 'London' },
    { name: 'Istanbul' },
    { name: 'Paris' }
  ];

  codes = [
    { code: '01' },
    { code: '02' },
    { code: '03' },
    { code: '04' },
    { code: '06' },
    { code: '07' },
    { code: '09' },
    { code: '050' },
    { code: '052' },
    { code: '054' },
    { code: '056' },
    { code: '058' },

  ]

  @ViewChild('ApplyModal') public ApplyModal: ModalDirective;


  constructor(private langHelper: langHelper, private ServicesService: ServicesService, private router: Router,
    private formBuilderHelper: formBuilderHelper, private toastr: ToastrService) {
    this.applicationForm = this.formBuilderHelper.CreateFormBuilder({
      mobileNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      timeToCall: '',
      comment: '',
      companyName: '',
   code:''
    });
  }


  ngOnInit(): void {
    window.scrollTo(0, 0)

    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;

  }
  ViewApply(type) {
    this.selectedType = type
    this.ApplyModal.show()
  }

  Apply() {

    const createServiceRequest = {
      date: new Date(),
      firstName: this.applicationForm.value.firstName,
      lastName: this.applicationForm.value.lastName,
      email: this.applicationForm.value.email,
      phoneNumber: this.selectedCode.code + this.applicationForm.value.mobileNumber,
      timeToCall: this.applicationForm.value.timeToCall,
      companyName: this.applicationForm.value.companyName,
      comment: this.applicationForm.value.comment,
      type: this.selectedType
    }

    this.ServicesService.CreateCorporateServiceRequest(createServiceRequest).subscribe(res => {
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
