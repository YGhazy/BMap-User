import { Injectable } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})

export class formBuilderHelper  {

  controllers;

  //General form builder controllers and validators

  constructor(private formBuilder: FormBuilder) {

    this.controllers = {
      userName: [Validators.required],
      firstName: [Validators.required],
      nationality: [Validators.required],
      phoneNumber: [Validators.required, Validators.pattern("[0-9]{7,}")],
      nationalID: [Validators.required],
      email: [Validators.email, Validators.required],
      accountNumber: [Validators.required, Validators.pattern("[0-9]{16}")],
      name: [Validators.required, Validators.pattern("[A-Za-z]*[\u0600-\u06FF]*$")], //arabic & english letters
      ewalletAmount: [Validators.required, Validators.pattern("[0-9]{2,6}")],
      rejectChequeReason: [Validators.required]
    }

  }

  //Create form builder via controller names
  createFormBuilder(controllerNames) {
    for (let entry of Object.entries(controllerNames)) {
      if (this.controllers[entry[0]][0] != '') {
      let x= [entry[1], this.controllers[entry[0]]]
      controllerNames[entry[0]] = x
      }
      else controllerNames[entry[0]]=[""]   
    }
    return(this.formBuilder.group(controllerNames))  
  }

  CustomizeFormbuilderValidator(controllerNames,customValidation) {
    for (let entry of Object.entries(controllerNames)) {
      let x = [entry[1], this.controllers[entry[0]]]
      entry[1] = x;
    }
    return (this.formBuilder.group(controllerNames, { validator: customValidation }))
  }

}
