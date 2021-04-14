import { Component, OnInit } from '@angular/core';
import { CreateContactRequestModel } from 'src/app/models/Request/create-contact-model';
import { ContactService } from 'src/app/services/contact.service';
import { formBuilderHelper } from 'src/app/services/utilities/formBuilderHelper';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm;
  disabled: boolean = false;
  contactResult: string;
  constructor(private contactService: ContactService, private formBuilderHelper: formBuilderHelper) {
    this.contactForm = this.formBuilderHelper.CreateFormBuilder({
      contactFirstName: '',
      contactLastName: '',
      email: '',
      mobileNumber: '',
      contactSubject: '',
      contactMessage: '',
    })
  }

  ngOnInit(): void {

  }

  CreateContactRequest() {
    if(this.contactForm.valid){
      this.disabled = true;
      var currentDate: Date;
      currentDate = new Date();
      const createContactRequest: CreateContactRequestModel = {
        firstName: this.contactForm.value.contactFirstName,
        lastName: this.contactForm.value.contactLastName,
        email: this.contactForm.value.email,
        subject: this.contactForm.value.contactSubject,
        message: this.contactForm.value.contactMessage,
        requestDate: currentDate
      }
      
      console.log(createContactRequest);
      this.contactService.CreateContactRequest(createContactRequest).subscribe(res => {
        if(res.succeeded){
          this.contactResult = "success";
          console.log("success")
          this.ResetForm();
        }
      },error => {
        this.contactResult = "failure";
        this.ResetForm();
        console.log(error);
      });
    }

  }

  ResetForm(){
    setTimeout(() => {
      this.contactResult = "";
      this.disabled = false;
      this.contactForm.reset();
    }, 3000);
  }

  get contactFormControls() {
    return this.contactForm.controls;
  }
}
