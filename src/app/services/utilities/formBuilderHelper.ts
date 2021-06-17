import { Injectable } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class formBuilderHelper {

  controllers;
   strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailOrPhoneValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private formBuilder: FormBuilder) {

    this.controllers = {
      fullName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      mobileNumber: [Validators.required, Validators.pattern("^([+0-9]{8,})$")],
      calendar: [Validators.required],
      age: [Validators.required],
      timeToCall :[Validators.required],
      type: [Validators.required],
      code: [Validators.required],
      nationality: [Validators.required],
      monthlySalary: [Validators.required],
      comment: [''],
      companyName: [Validators.required],
      address: [Validators.required],
      contactFirstName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      contactLastName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      contactSubject: [Validators.required],
      contactMessage: [Validators.required],
      image: [Validators.required],
      userName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      newPassword: [Validators.pattern("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")],
      password: [Validators.required, Validators.pattern(this.strongRegex)],
      confirmPassword: [Validators.required],
      ENValidation: [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.max(40)],
      ARValidation: [Validators.required, Validators.pattern('^[\u0600-\u06ff ]+$'), Validators.max(40)],
      //Registeration validators
      firstName: [Validators.required, Validators.min(1), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      firstMiddleName: [Validators.required, Validators.min(1), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      secondMiddleName: [Validators.required, Validators.min(1), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      lastName: [Validators.required, Validators.min(1), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      email: [Validators.required, Validators.pattern(this.emailValidationPattern)],
      subscribtion: [Validators.required],
      nationalID: [Validators.required, Validators.minLength(14)],
      gender: [Validators.required],
      dateOfBirth: [Validators.required],
      jobTitle: [Validators.required],
      city: [Validators.required],
      province: [Validators.required],
      country: [Validators.required],
      street: [Validators.required],
      accountType: [Validators.required],
      //Application request validations
      serviceType: [Validators.required],
      bankName: [Validators.required],
      note: [Validators.required],
      acknowledgment: [Validators.required],
    }
  }

  CreateFormBuilder(controllerNames) {
    for (let entry of Object.entries(controllerNames)) {
      if (this.controllers[entry[0]][0] != '') {
        let x = [entry[1], this.controllers[entry[0]]]
        controllerNames[entry[0]] = x
      }
      else controllerNames[entry[0]] = [""]

    }
    return (this.formBuilder.group(controllerNames))
  }

  CustomizeFormbuilderValidator(controllerNames, customValidation) {
    for (let entry of Object.entries(controllerNames)) {

      let x = [entry[1], this.controllers[entry[0]]]
      entry[1] = x;
    }
    return (this.formBuilder.group(controllerNames, { validator: customValidation }))
  }

}
