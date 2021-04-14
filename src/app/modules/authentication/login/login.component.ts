import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../../models/auth-models/LoginModel';
import { AuthenticationService } from '../../../services/authentication.service';
import { formBuilderHelper } from '../../../services/utilities/formBuilderHelper';

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
  isLoading: boolean  =false
  constructor(private formBuilderHelper: formBuilderHelper, private AuthenticationService: AuthenticationService, private router: Router) {
    this.LoginForm = this.formBuilderHelper.CreateFormBuilder({ email: '', password: '' })

  }

  ngOnInit(): void {
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
          this.router.navigate(["/home"]);
          this.AuthenticationService.setToken(res.data.token);
        console.log("login")

      }
    }, error => {
      console.log(error);
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
