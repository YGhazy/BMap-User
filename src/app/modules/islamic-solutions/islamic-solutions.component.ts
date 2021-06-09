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
  typesEnum = CorporateTypes

  selectedNationality
  nationalityList = 
  [{ NationalityID: 1, CountryCode: 'GB', name: 'British' },
            { NationalityID: 34, CountryCode: 'AF', name: 'Afghan' },
            { NationalityID: 35, CountryCode: 'AL', name: 'Albanian' },
            { NationalityID: 36, CountryCode: 'DZ', name: 'Algerian' },
            { NationalityID: 158, CountryCode: 'US', name: 'American' },
            { NationalityID: 38, CountryCode: 'AD', name: 'Andorran' },
            { NationalityID: 39, CountryCode: 'AO', name: 'Angolan' },
            { NationalityID: 40, CountryCode: 'AM', name: 'Armenian' },
            { NationalityID: 41, CountryCode: 'AT', name: 'Austrian' },
            { NationalityID: 42, CountryCode: 'AZ', name: 'Azerbaijani' },
            { NationalityID: 2, CountryCode: 'AR', name: 'Argentinian' },
            { NationalityID: 3, CountryCode: 'AU', name: 'Australian' },
            { NationalityID: 43, CountryCode: 'BH', name: 'Bahraini' },
            { NationalityID: 44, CountryCode: 'BD', name: 'Bangladeshi' },
            { NationalityID: 45, CountryCode: 'BB', name: 'Barbadian' },
            { NationalityID: 46, CountryCode: 'BY', name: 'Belarusian' },
            { NationalityID: 47, CountryCode: 'BZ', name: 'Belizean' },
            { NationalityID: 48, CountryCode: 'BJ', name: 'Beninese' },
            { NationalityID: 49, CountryCode: 'BM', name: 'Bermudian' },
            { NationalityID: 50, CountryCode: 'BT', name: 'Bhutanese' },
            { NationalityID: 51, CountryCode: 'BO', name: 'Bolivian' },
            { NationalityID: 52, CountryCode: 'BA', name: 'Bosnian' },
            { NationalityID: 53, CountryCode: 'BW', name: 'Botswanan' },
            { NationalityID: 54, CountryCode: 'BG', name: 'Bulgarian' },
            { NationalityID: 55, CountryCode: 'BF', name: 'Burkinese' },
            { NationalityID: 56, CountryCode: 'BI', name: 'Burundian' },
            { NationalityID: 7, CountryCode: 'CA', name: 'Canadian' },
            { NationalityID: 8, CountryCode: 'CN', name: 'Chinese' },
            { NationalityID: 9, CountryCode: 'CO', name: 'Colombian' },
            { NationalityID: 10, CountryCode: 'CU', name: 'Cuban' },
            { NationalityID: 57, CountryCode: 'KH', name: 'Cambodian' },
            { NationalityID: 58, CountryCode: 'CM', name: 'Cameroonian' },
            { NationalityID: 59, CountryCode: 'CV', name: 'Cape Verdean' },
            { NationalityID: 60, CountryCode: 'TD', name: 'Chadian' },
            { NationalityID: 61, CountryCode: 'CL', name: 'Chilean' },
            { NationalityID: 62, CountryCode: 'CG', name: 'Congolese' },
            { NationalityID: 63, CountryCode: 'CR', name: 'Costa Rican' },
            { NationalityID: 64, CountryCode: 'HR', name: 'Croat' },
            { NationalityID: 65, CountryCode: 'CY', name: 'Cypriot' },
            { NationalityID: 66, CountryCode: 'CZ', name: 'Czech' },
            { NationalityID: 67, CountryCode: 'DK', name: 'Danish' },
            { NationalityID: 11, CountryCode: 'DO', name: 'Dominican' },
            { NationalityID: 68, CountryCode: 'DJ', name: 'Djiboutian' },
            { NationalityID: 69, CountryCode: 'DM', name: 'Dominican' },
            { NationalityID: 26, CountryCode: 'NL', name: 'Dutch' },
            { NationalityID: 12, CountryCode: 'EC', name: 'Ecuadorean' },
            { NationalityID: 70, CountryCode: 'EG', name: 'Egyptian' },
            { NationalityID: 71, CountryCode: 'ER', name: 'Eritrean' },
            { NationalityID: 72, CountryCode: 'EE', name: 'Estonian' },
            { NationalityID: 73, CountryCode: 'ET', name: 'Ethiopian' },
            { NationalityID: 74, CountryCode: 'FJ', name: 'Fijian' },
            { NationalityID: 75, CountryCode: 'FI', name: 'Finnish' },
            { NationalityID: 76, CountryCode: 'PF', name: 'French Polynesian' },
            { NationalityID: 14, CountryCode: 'FR', name: 'French' },
            { NationalityID: 77, CountryCode: 'GA', name: 'Gabonese' },
            { NationalityID: 78, CountryCode: 'GM', name: 'Gambian' },
            { NationalityID: 79, CountryCode: 'GE', name: 'Georgian' },
            { NationalityID: 15, CountryCode: 'DE', name: 'German' },
            { NationalityID: 16, CountryCode: 'GT', name: 'Guatemalan' },
            { NationalityID: 80, CountryCode: 'GH', name: 'Ghanaian' },
            { NationalityID: 81, CountryCode: 'GR', name: 'Greek' },
            { NationalityID: 82, CountryCode: 'GD', name: 'Grenadian' },
            { NationalityID: 83, CountryCode: 'GN', name: 'Guinean' },
            { NationalityID: 84, CountryCode: 'GY', name: 'Guyanese' },
            { NationalityID: 17, CountryCode: 'HT', name: 'Haitian' },
            { NationalityID: 18, CountryCode: 'HN', name: 'Honduran' },
            { NationalityID: 85, CountryCode: 'HU', name: 'Hungarian' },
            { NationalityID: 19, CountryCode: 'IN', name: 'Indian' },
            { NationalityID: 20, CountryCode: 'IE', name: 'Ireland' },
            { NationalityID: 21, CountryCode: 'IL', name: 'Israeli' },
            { NationalityID: 22, CountryCode: 'IT', name: 'Italian' },
            { NationalityID: 86, CountryCode: 'IS', name: 'Icelandic' },
            { NationalityID: 87, CountryCode: 'ID', name: 'Indonesian' },
            { NationalityID: 88, CountryCode: 'IR', name: 'Iranian' },
            { NationalityID: 89, CountryCode: 'IQ', name: 'Iraqi' },
            { NationalityID: 23, CountryCode: 'JP', name: 'Japanese' },
            { NationalityID: 90, CountryCode: 'JM', name: 'Jamaican' },
            { NationalityID: 91, CountryCode: 'JO', name: 'Jordanian' },
            { NationalityID: 92, CountryCode: 'KZ', name: 'Kazakh' },
            { NationalityID: 93, CountryCode: 'KE', name: 'Kenyan' },
            { NationalityID: 94, CountryCode: 'KP', name: 'North Korean' },
            { NationalityID: 95, CountryCode: 'KW', name: 'Kuwaiti' },
            { NationalityID: 96, CountryCode: 'LV', name: 'Latvian' },
            { NationalityID: 97, CountryCode: 'LB', name: 'Lebanese' },
            { NationalityID: 98, CountryCode: 'LR', name: 'Liberian' },
            { NationalityID: 99, CountryCode: 'LY', name: 'Libyan' },
            { NationalityID: 100, CountryCode: 'LT', name: 'Lithuanian' },
            { NationalityID: 101, CountryCode: 'LU', name: 'LUXEMBOURG' },
            { NationalityID: 102, CountryCode: 'MG', name: 'Madagascan' },
            { NationalityID: 103, CountryCode: 'MW', name: 'Malawian' },
            { NationalityID: 104, CountryCode: 'MY', name: 'Malaysian' },
            { NationalityID: 105, CountryCode: 'MV', name: 'Maldivian' },
            { NationalityID: 106, CountryCode: 'ML', name: 'Malian' },
            { NationalityID: 107, CountryCode: 'MT', name: 'Maltese' },
            { NationalityID: 108, CountryCode: 'MR', name: 'Mauritanian' },
            { NationalityID: 109, CountryCode: 'MU', name: 'Mauritian' },
            { NationalityID: 110, CountryCode: 'MC', name: 'Monacan' },
            { NationalityID: 111, CountryCode: 'MN', name: 'Mongolian' },
            { NationalityID: 112, CountryCode: 'ME', name: 'Montenegrin' },
            { NationalityID: 113, CountryCode: 'MA', name: 'Moroccan' },
            { NationalityID: 114, CountryCode: 'MZ', name: 'Mozambican' },
            { NationalityID: 25, CountryCode: 'MX', name: 'Mexican' },
            { NationalityID: 115, CountryCode: 'NA', name: 'Namibian' },
            { NationalityID: 116, CountryCode: 'NP', name: 'Nepalese' },
            { NationalityID: 117, CountryCode: 'NZ', name: 'New Zealand' },
            { NationalityID: 118, CountryCode: 'NI', name: 'Nicaraguan' },
            { NationalityID: 119, CountryCode: 'NE', name: 'Nigerien' },
            { NationalityID: 120, CountryCode: 'NG', name: 'Nigerian' },
            { NationalityID: 121, CountryCode: 'NO', name: 'Norwegian' },
            { NationalityID: 122, CountryCode: 'OM', name: 'Omani' },
            { NationalityID: 123, CountryCode: 'PK', name: 'Pakistani' },
            { NationalityID: 124, CountryCode: 'PA', name: 'Panamanian' },
            { NationalityID: 125, CountryCode: 'PG', name: 'Guinean' },
            { NationalityID: 126, CountryCode: 'PY', name: 'Paraguayan' },
            { NationalityID: 127, CountryCode: 'PE', name: 'Peruvian' },
            { NationalityID: 27, CountryCode: 'PH', name: 'Philippine' },
            { NationalityID: 128, CountryCode: 'PL', name: 'Polish' },
            { NationalityID: 129, CountryCode: 'PT', name: 'Portuguese' },
            { NationalityID: 130, CountryCode: 'QA', name: 'Qatari' },
            { NationalityID: 131, CountryCode: 'RO', name: 'Romanian' },
            { NationalityID: 132, CountryCode: 'RW', name: 'Rwandan' },
            { NationalityID: 13, CountryCode: 'SV', name: 'Salvadorean' },
            { NationalityID: 37, CountryCode: 'AS', name: 'Samoan' },
            { NationalityID: 133, CountryCode: 'SA', name: 'Saudi Arabian' },
            { NationalityID: 134, CountryCode: 'SN', name: 'Senegalese' },
            { NationalityID: 135, CountryCode: 'RS', name: 'Serbian' },
            { NationalityID: 136, CountryCode: 'SL', name: 'Sierra Leonian' },
            { NationalityID: 137, CountryCode: 'SG', name: 'Singaporean' },
            { NationalityID: 138, CountryCode: 'SK', name: 'Slovak' },
            { NationalityID: 139, CountryCode: 'SI', name: 'Slovenian' },
            { NationalityID: 140, CountryCode: 'SB', name: 'Slomoni' },
            { NationalityID: 141, CountryCode: 'SO', name: 'Somali' },
            { NationalityID: 142, CountryCode: 'ZA', name: 'South African' },
            { NationalityID: 24, CountryCode: 'KR', name: 'South Korean' },
            { NationalityID: 28, CountryCode: 'ES', name: 'Spanish' },
            { NationalityID: 29, CountryCode: 'SE', name: 'Swedish' },
            { NationalityID: 30, CountryCode: 'CH', name: 'Swiss' },
            { NationalityID: 143, CountryCode: 'LK', name: 'Sri Lankan' },
            { NationalityID: 144, CountryCode: 'SD', name: 'Sudanese' },
            { NationalityID: 145, CountryCode: 'SR', name: 'Surinamese' },
            { NationalityID: 146, CountryCode: 'SZ', name: 'Swazi' },
            { NationalityID: 31, CountryCode: 'TW', name: 'Taiwanese' },
            { NationalityID: 147, CountryCode: 'TJ', name: 'Tajik' },
            { NationalityID: 148, CountryCode: 'TH', name: 'Thai' },
            { NationalityID: 149, CountryCode: 'TG', name: 'Togolese' },
            { NationalityID: 150, CountryCode: 'TT', name: 'Trinidadian' },
            { NationalityID: 151, CountryCode: 'TN', name: 'Tunisian' },
            { NationalityID: 152, CountryCode: 'TR', name: 'Turkish' },
            { NationalityID: 153, CountryCode: 'TM', name: 'Turkoman' },
            { NationalityID: 154, CountryCode: 'TV', name: 'Tuvaluan' },
            { NationalityID: 155, CountryCode: 'UG', name: 'Ugandan' },
            { NationalityID: 156, CountryCode: 'UA', name: 'Ukrainian' },
            { NationalityID: 157, CountryCode: 'AE', name: 'Emirati' },
            { NationalityID: 32, CountryCode: 'VE', name: 'Venezuelan' },
            { NationalityID: 33, CountryCode: 'VN', name: 'Vietnamese' },
            { NationalityID: 159, CountryCode: 'UY', name: 'Uruguayan' },
            { NationalityID: 160, CountryCode: 'UZ', name: 'Uzbek' },
            { NationalityID: 161, CountryCode: 'VU', name: 'Vanuatuan' },
            { NationalityID: 162, CountryCode: 'YE', name: 'Yemeni' },
            { NationalityID: 163, CountryCode: 'ZM', name: 'Zambian' }
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
