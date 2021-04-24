import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { RegisterModel } from '../../models/auth-models/RegisterModel';
import { AuthenticationService } from '../../services/authentication.service';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';
import { langHelper } from '../../services/utilities/language-helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  defaultImg:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNGQ0UzNTdEODZBRjExRTU4Qzg4Q0JCQjZBNzQxOTBFIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNGQ0UzNTdDODZBRjExRTU4Qzg4Q0JCQjZBNzQxOTBFIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMTA3OUM4M0JBOEMxMUUyODk1OUUwMDM4ODMyNkMyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTA3OUM4NEJBOEMxMUUyODk1OUUwMDM4ODMyNkMyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/bAEMABgQEBQQEBgUFBQYGBgcJDgkJCAgJEg0NCg4VEhYWFRIUFBcaIRwXGB8ZFBQdJx0fIiMlJSUWHCksKCQr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"
  langVar;
  currentLang
  confirmPasswordError= false;
  //handling show/hide password
  inputType: string = "password";
  inputConfirmType: string = "password";
  pView: string = "-slash";
  pViewConfirmPassword: string = "-slash";
  currentPage: number = 1; // current page indicator
  isLoading: boolean = false;
  flag: boolean = false;
  //dropdown variables
  stValue: string;
  showOptions: boolean = false;
  show: boolean = true;

  //gender selection variable
  selectedGender: string;

  //FormGroup
  signupForm;
  signupForm1;
  signupForm2;

  registerationResult: boolean;
  constructor(private langhelper: langHelper, private formBuilderHelper: formBuilderHelper, private AuthenticationService: AuthenticationService, private customerService: CustomerService, private router: Router, private toastr: ToastrService) {

    this.signupForm1 = this.formBuilderHelper.CreateFormBuilder({
      firstName: '',
      firstMiddleName: '',
      secondMiddleName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      gender: '',

    });
    this.signupForm2 = this.formBuilderHelper.CreateFormBuilder({
      nationalID: '',
      accountType: '',
      dateOfBirth: '',
      jobTitle: '',
      password: '',
      confirmPassword: '',
    });
    this.signupForm = this.formBuilderHelper.CreateFormBuilder({

      address: '',
      city: '',
      province: '',
      country: '',
      street: '',

    });
  }
  accountType_values = [
    { id: 0, value: "Individual"},
    { id: 1, value: "Company" },
  ];
  ngOnInit(): void {
    this.langVar = this.langhelper.initializeMode();
    this.currentLang = this.langhelper.currentLang;
  }


  //Account type selection section
  //Display account type downdown list
  showOption() {
    if (this.flag == false) {
      this.showOptions = true;
      this.show = false;
      this.flag = true;

    }
    else {
      this.showOptions = false;
      this.show = true;
      this.flag = false;
    }
  }
  hideOption() {
    this.showOptions = false;
    this.show = true;
    this.flag = false;
  }

  //Fetch account type dropdown item value and select it
  getAccountTypeValue(id: any) {
    this.stValue = this.accountType_values.find(b => b.id == id).value;
    this.showOptions = false;
    this.show = true;
  }

  //Gender selection 'Appends value to gender formControl, adds highlighted ngClass to selected gender icon
  SelectGender(selector: string) {
    this.signupForm.value.gender = selector;
    this.selectedGender = selector;
  }

  //Customer registeration api call
  Register() {
    this.isLoading = true;

    const RegisterModel: RegisterModel = {
      gender: this.signupForm1.value.gender,
      email: this.signupForm1.value.email,
      phoneNumber: this.signupForm1.value.mobileNumber,
      nationalID: this.signupForm2.value.nationalID,
      dateOfBirth: this.signupForm2.value.dateOfBirth,
      jobTitle: this.signupForm2.value.jobTitle,
      type: this.signupForm2.value.accountType,
      accountStatus: 'pending',
      city: this.signupForm.value.city,
      province: this.signupForm.value.province,
      country: this.signupForm.value.country,
      street: this.signupForm.value.city,
      nationalIdFront: this.defaultImg,
      nationalIdBack: this.defaultImg,
      profilePicture: this.defaultImg,
      first: this.signupForm1.value.firstName,
      firstMiddle: this.signupForm1.value.firstMiddleName,
      secondMiddle: this.signupForm1.value.secondMiddleName,
      last: this.signupForm1.value.lastName,
      password: this.signupForm2.value.password
    }
    console.log(RegisterModel)
   
    this.customerService.Register(RegisterModel).subscribe(res => {
      if (res.succeeded) {
        //console.log("registered ", res.data);
        //this.router.navigateByUrl('/login')
        //this.registerationResult = true;
        this.toastr.success(this.langVar.sent, 'Success', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });

          this.router.navigate(["/login"]);
       
      }
    }, errors => {
      //this.registerationResult = false;
        console.log(errors.error);
        console.log(errors.error.errors);
        let error = errors.error.errors
        //  this.isLoading = false;
        if (this.currentLang == 'ar' && error[1] != null && error[1] != undefined) {
          this.toastr.error(error[1], 'Error', {
            disableTimeOut: false,
            closeButton: true,
            positionClass: 'toast-top-center'
          });
        }
        else if (this.currentLang == 'en' && error[0] != null && error[1] != undefined) {
          this.toastr.error(error[0], 'Error', {
            disableTimeOut: false,
            closeButton: true,
            positionClass: 'toast-top-center'
          });
        }
        else 
        this.toastr.error(this.langVar.invalid.invalidRegister, 'Error', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
        this.isLoading = false;
    });
  }
  //Page navigation
  Back() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
  }
  Next() {
    if (this.currentPage < 3) {
        console.log(this.signupForm2.value.confirmPassword, this.signupForm2.value.password)
      if (this.currentPage == 2 && this.signupForm2.value.confirmPassword != this.signupForm2.value.password) {

        this.confirmPasswordError = true
      }
      else {
        this.confirmPasswordError = false

         this.currentPage = this.currentPage + 1;
      }
    }


  }


  //Password section
  //View/Hide password
  viewPassword() {
    if (this.inputType != 'text') {
      this.inputType = 'text';
      this.pView = "";
    }
    else {
      this.inputType = 'password';
      this.pView = "-slash";

    }
  }

  viewConfirmPassword() {
    if (this.inputConfirmType != 'text') {
      this.inputConfirmType = 'text';
      this.pViewConfirmPassword = "";
    }
    else {
      this.inputConfirmType = 'password';
      this.pViewConfirmPassword = "-slash";
    }
  }

  //validate password isEqual confimPassword
  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? false : { notSame: true }
  }

  get signupFormControls() {
    return this.signupForm.controls;
  }
  get signupForm1Controls() {
    return this.signupForm1.controls;
  }
  get signupForm2Controls() {
    return this.signupForm2.controls;
  }
}
