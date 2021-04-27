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
      nationalIdFront: "",
      nationalIdBack:"",
      profilePicture: "",
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
