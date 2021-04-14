import { Injectable } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class formBuilderHelper {

  controllers;
  emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private formBuilder: FormBuilder) {

    this.controllers = {
      fullName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      mobileNumber: [Validators.required, Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")],
      calendar: [Validators.required],
      age: [Validators.required],
      type: [Validators.required],
      address: [Validators.required],
      contactFirstName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      contactLastName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      contactSubject: [Validators.required, Validators.min(10)],
      contactMessage: [Validators.required, Validators.min(10)],
      image: [Validators.required],
      userName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      newPassword: [Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")],
      password: [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")],
      confirmPassword: [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")],
      ENValidation: [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.max(40)],
      ARValidation: [Validators.required, Validators.pattern('^[\u0600-\u06ff ]+$'), Validators.max(40)],
      //Registeration validators
      firstName: [Validators.required, Validators.min(1), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      firstMiddleName: [Validators.required, Validators.min(1), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      secondMiddleName: [Validators.required, Validators.min(1), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      lastName: [Validators.required, Validators.min(1), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],
      email: [Validators.required, Validators.pattern(this.emailValidationPattern)],
      nationalID: [Validators.required, Validators.minLength(14)],
      gender: [Validators.required],
      dateOfBirth: [Validators.required, Validators.pattern('/(\d{2})\/(\d{2})\/(\d{4})/')],
      jobTitle: [Validators.required],
      city: [Validators.required],
      province: [Validators.required],
      country: [Validators.required],
      street: [Validators.required],
      accountType: [Validators.required],
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
