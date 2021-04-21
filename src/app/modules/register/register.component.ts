import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  registerationResult: boolean;
  constructor(private langhelper: langHelper,private formBuilderHelper: formBuilderHelper, private AuthenticationService: AuthenticationService, private customerService: CustomerService, private router: Router) {
    this.signupForm = this.formBuilderHelper.CreateFormBuilder({
      firstName: '',
      firstMiddleName: '',
      secondMiddleName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      nationalID: '',
      gender: '',
      dateOfBirth: '',
      jobTitle: '',
      address: '',
      city: '',
      province: '',
      country: '',
      accountType: '',
      password: '',
      confirmPassword: '',
    });
  }
  accountType_values = [
    { id: 0, value: "Individual" },
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
    const RegisterModel: RegisterModel = {
      gender: this.signupForm.value.gender,
      email: this.signupForm.value.email,
      phoneNumber: this.signupForm.value.mobileNumber,
      nationalID: this.signupForm.value.nationalID,
      dateOfBirth: this.signupForm.value.dateOfBirth,
      jobTitle: this.signupForm.value.jobTitle,
      type: this.signupForm.value.accountType,
      accountStatus: 'pending',
      city: this.signupForm.value.city,
      province: this.signupForm.value.province,
      country: this.signupForm.value.country,
      street: "",
      nationalIdFront: "",
      nationalIdBack: "",
      profilePicture: "",
      first: this.signupForm.value.firstName,
      firstMiddle: this.signupForm.value.firstMiddleName,
      secondMiddle: this.signupForm.value.secondMiddleName,
      last: this.signupForm.value.lastName,
      password: this.signupForm.value.password
    }
    console.log(RegisterModel)
    debugger;
    this.customerService.Register(RegisterModel).subscribe(res => {
      if (res.succeeded) {
        console.log("registered ", res.data);
        this.registerationResult = true;
      }
    }, error => {
      this.registerationResult = false;
      console.log(error);
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
      this.currentPage = this.currentPage + 1;
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
}
