import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalResponse } from 'src/app/enums/modal-response';
import { langHelper } from 'src/app/services/utilities/language-helper';

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
  @ViewChild('rejectionModal') public rejectionModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  @ViewChild('preloader') public preloader: ModalDirective;

  succesMsg;
  failmsg;

  //info modal vars
  infoTitle: string;
  infoMessage: string;
  infoType: number; // enum number

  langVar;
  currentLang;

  //Confirmation Modal event emitter
  @Output() SetConfirmation: EventEmitter<ModalResponse> = new EventEmitter<ModalResponse>();

  constructor(private formBuilder: FormBuilder, private router: Router, private langHelper: langHelper) { 
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
  }

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
  showRejectionReason(msg){
    this.failmsg = msg
    this.rejectionModal.show()
  }

  //Confirmation Section
  DisplayConfirmationModal(title, message, type) {
    this.infoTitle = title;
    this.infoMessage = message;
    this.infoType = type;
    this.confirmationModal.show();
  }

  public SetInfoConfirmation(status) {
    if (status == '3') {
      this.confirmationModal.hide();
    }
    else {
      this.SetConfirmation.emit(status);
      this.confirmationModal.hide();
    }
  }
  // ---
  ChangeImgModalShow(image) {
    this.ChangeImg.show();
  }

}
