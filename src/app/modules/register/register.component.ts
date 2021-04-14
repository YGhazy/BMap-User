import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/auth-models/RegisterModel';
import { AuthenticationService } from '../../services/authentication.service';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //handling show/hide password
  signupForm;
  inputType: string = "password";
  inputConfirmType: string = "password";
  pView: string = "-slash";
  pViewConfirmPassword: string = "-slash";
  currentPage: number = 1; // current page indicator 'replaced next1/2/3 booleans'
  isLoading: boolean = false;
  flag: boolean = false;
  //dropdown variables
  stValue: string;
  genderValue: string;
  showOptions: boolean = false;
  show: boolean = true;

  constructor(private formBuilderHelper: formBuilderHelper, private AuthenticationService: AuthenticationService, private router: Router) {
    this.signupForm = this.formBuilderHelper.CustomizeFormbuilderValidator({
      mail: '', password: '', confirmPassword: '',
      firstMiddleName: '', firstName: '', SecondMiddleName: '',
      lastName: '', phoneNumber: '', nationalID: '', gender: ''

    }, this.checkPasswords)

  }
  accountType_values = [
    { id: 0, value: "Individual" },
    { id: 1, value: "Company" },
  ];
  gender_values = [
    { id: 0, value: "Male" },
    { id: 1, value: "Female" },
  ];
  ngOnInit(): void {
  }

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
  getAccountTypeValue(id: any) {
    this.stValue = this.accountType_values.find(b => b.id == id).value;
    this.showOptions = false;
    this.show = true;
  }

  getGenderValue(id: any) {
    this.genderValue = this.gender_values.find(b => b.id == id).value;
    this.showOptions = false;
    this.show = true;
  }

  hideOption() {

    this.showOptions = false;
    this.show = true;
    this.flag = false;
  }

  Register() {

    const RegisterModel: RegisterModel = {
      gender: "",
      email: this.signupForm.mail.value,
      phoneNumber: this.signupForm.phoneNumber.value,
      nationalID: this.signupForm.phoneNumber.value,
      dateOfBirth: this.signupForm.phoneNumber.value,
      jobTitle: this.signupForm.phoneNumber.value,
      type: this.signupForm.phoneNumber.value,
      accountStatus: this.signupForm.phoneNumber.value,
      city: this.signupForm.phoneNumber.value,
      province: this.signupForm.phoneNumber.value,
      country: this.signupForm.phoneNumber.value,
      street: this.signupForm.phoneNumber.value,
      nationalIdFront: "",
      nationalIdBack: "",
      profilePicture: "",
      first: this.signupForm.phoneNumber.value,
      firstMiddle: this.signupForm.phoneNumber.value,
      secondMiddle: this.signupForm.phoneNumber.value,
      last: this.signupForm.phoneNumber.value,
      password: this.signupForm.phoneNumber.value
    }
    console.log(RegisterModel)

    this.AuthenticationService.login(RegisterModel).subscribe(res => {
      if (res.succeeded) {
        this.router.navigate(["/home"]);
        this.AuthenticationService.setToken(res.data.token);
        console.log("login")

      }
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  //Page navigation

  Back() {
    if(this.currentPage > 1){
      this.currentPage = this.currentPage - 1;
    }
  }
  Next() {
    if(this.currentPage < 3){
      this.currentPage = this.currentPage + 1;
    }
  }
  
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
  get f() {
    return this.signupForm.controls;
  }


}
