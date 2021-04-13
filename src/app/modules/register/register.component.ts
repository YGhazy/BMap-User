import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/auth-models/RegisterModel';
import { AuthenticationService } from '../../services/http-services/authentication.service';
import { formBuilderHelper } from '../../services/utilities/formBuilderHelper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //handling show/hide password
  inputType: string = "password";
  inputConfirmType: string = "password";
  pView: string = "-slash";
  pViewConfirmPassword: string = "-slash";
  signupForm;
  Next1: boolean=true
  Next2: boolean=false
  Next3: boolean = false
  isLoading: boolean = false

  flag: boolean = false;
  showOptions: boolean = false;
  show: boolean = true;
  stValue: string;
  ItemValue: any;
  constructor(private formBuilderHelper: formBuilderHelper, private AuthenticationService: AuthenticationService, private router: Router) {
    this.signupForm = this.formBuilderHelper.CustomizeFormbuilderValidator({
       mail: '', password: '', confirmPassword: '',
      firstMiddleName: '', firstName: '', SecondMiddleName: '',
      lastName: '', phoneNumber: '', nationalID:'',gender:''

    }, this.checkPasswords)

  }
  status_values = [
    { id: 0, value: "Individual" },
    { id: 1, value: "Company" },
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
  getItemValue(id: any) {
    this.ItemValue = this.status_values.find(b => b.id == id);
    console.log("status value ", this.ItemValue);
    this.stValue = this.ItemValue.value;
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

  Back(index) {
    if (index == '1') {

      this.Next1 = true
      this.Next2 = false
      this.Next3 = false
    }
    else if (index == '2') {

      this.Next1 = false
      this.Next2 = true
      this.Next3 = false
    }
  }
  Next(index) {
    if (index == '1') {

    this.Next1 = false
    this.Next2= true
    this.Next3 = false
    }
   else if (index == '2') {

      this.Next1 = false
      this.Next2 = false
      this.Next3 = true
    }
    //else if (index == '3') {

    //  this.Next1 = false
    //  this.Next2 = false
    //  this.Next3 = true
    //}

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
