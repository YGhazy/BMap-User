import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IslamicTypes } from '../../enums/IslamicTypes';
import { ServicesService } from '../../services/ServicesService';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-islamic-solutions',
  templateUrl: './islamic-solutions.component.html',
  styleUrls: ['./islamic-solutions.component.scss']
})
export class IslamicSolutionsComponent implements OnInit {

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
      timeToCall: '',
      nationality: '',
      monthlySalary: '',
      code:''
    });
  }


  ngOnInit(): void {

    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;

  }

  ViewApply(type) {
    console.log(type)
    this.selectedType = type
    this.ApplyModal.show()
  }


  Apply() {
    console.log(this.applicationForm.value.nationality)
    console.log(this.selectedNationality)
    const createServiceRequest = {
      date: new Date(),
      firstName: this.applicationForm.value.firstName,
      lastName: this.applicationForm.value.lastName,
      email: this.applicationForm.value.email,
      phoneNumber: this.selectedCode.code+this.applicationForm.value.mobileNumber,
      timeToCall: this.applicationForm.value.timeToCall,
      nationality: this.selectedNationality.name ,
      monthlySalary: parseInt(this.applicationForm.value.monthlySalary),
      type: this.selectedType
    }

    console.log(createServiceRequest);
    this.ServicesService.CreateIslamicServiceRequest(createServiceRequest).subscribe(res => {
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
