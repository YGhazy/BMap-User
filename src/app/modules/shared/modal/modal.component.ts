import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

//Shared Modal component for displaying general popups in parent components.
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
  
})
export class ModalComponent implements OnInit {

  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('ChangeImg') public ChangeImg: ModalDirective;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;

  succesMsg;
  failmsg;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  showSuccessModal(msg) {
    this.succesMsg = msg
    this.successModal.show()
  }

  showFailModal(msg) {
    this.failmsg = msg
    this.dangerModal.show()
  }
  hideSuccessModal() {
    this.successModal.hide()
   // window.location.reload();
    
  }
  ChangeImgModalShow(image) {
    this.ChangeImg.show();
  }
}
