import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../../../models/auth-models/LoginModel';
import { AuthenticationService } from '../../../services/authentication.service';
import { formBuilderHelper } from '../../../services/utilities/formBuilderHelper';
import { langHelper } from '../../../services/utilities/language-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //handling show/hide password
  inputType: string = "password";
  pView: string = "-slash";
  LoginForm;
  langVar;
  currentLang
  isLoading: boolean  =false
  constructor(private langhelper:langHelper,private formBuilderHelper: formBuilderHelper, private AuthenticationService: AuthenticationService, private router: Router,  private toastr: ToastrService) {
    this.LoginForm = this.formBuilderHelper.CreateFormBuilder({ email: '', password: '' })

  }

  ngOnInit(): void {
    this.langVar = this.langhelper.initializeMode();
    this.currentLang = this.langhelper.currentLang;
  }
  login() {
    this.isLoading = true;
    //this.isAttemptingLogin = true;
    const loginModel: LoginModel = {
      email: this.LoginForm.value.email,
      password: this.LoginForm.value.password
    }
    console.log(loginModel)

    this.AuthenticationService.login(loginModel).subscribe(res => {
      if (res.succeeded) {
        this.toastr.success(this.langVar.invalid.loginRedirect, 'Success', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
        this.AuthenticationService.setToken(res.data.token);
        setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 3000);
      }
    }, error => {
        this.toastr.error(this.langVar.invalid.invalidLogin, 'Error', {
        disableTimeOut: false,
        closeButton: true,
        positionClass: 'toast-top-center'
      });
      this.isLoading = false;
    });
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
  get f() {
    return this.LoginForm.controls;
  }
}
