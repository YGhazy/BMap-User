import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ModalResponse } from 'src/app/enums/modal-response';
import { ApplicationUser } from 'src/app/models/http-models/application-user';
import { Customer } from 'src/app/models/http-models/customer';
import { EditCustomerModel } from 'src/app/models/Request/edit-customer-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomerService } from 'src/app/services/customer.service';
import { formBuilderHelper } from 'src/app/services/utilities/formBuilderHelper';
import { helperFunctions } from 'src/app/services/utilities/helperFunctions';
import { langHelper } from 'src/app/services/utilities/language-helper';
import { EditImageModel } from '../../models/http-models/edit-image-model';
import { ChangePasswordModel } from '../../models/Request/change-password-model';
import { AccountService } from '../../services/account.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  langVar;
  currentLang

  client: ApplicationUser;

  isEditingAccount: boolean = false;
  isChangingPassword: boolean = false;

  oldPassword: string;
  newPassword: string;

  //FormGroup
  editAccountForm: FormGroup;
  editPasswordForm: FormGroup;


  uploadedNationalIdImageFront: any = "./assets/images/image_placeholder.jpg";
  uploadedNationalIdImageBack: any = "./assets/images/image_placeholder.jpg";
  uploadedProfilePicture: any = "./assets/images/image_placeholder.jpg";
  emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  @ViewChild('editPasswordConfirmationModal') public editPasswordConfirmationModal: ModalDirective;
  @ViewChild('editAccountConfirmationModal') public editAccountConfirmationModal: ModalDirective;
  @ViewChild('uploadNationalIdFrontModal') public uploadNationalIdFrontModal: ModalDirective;
  @ViewChild('uploadNationalIdBackModal') public uploadNationalIdBackModal: ModalDirective;
  @ViewChild('uploadProfilePictureModal') public uploadProfilePictureModal: ModalDirective;
  @ViewChild(ModalComponent) modalComponent: ModalComponent;


    constructor(private authService: AuthenticationService, private customerService: CustomerService, private accountService: AccountService, private langHelper: langHelper,
    private toastr: ToastrService, private router: Router, private formBuilderHelper: formBuilderHelper, private helperFunctions: helperFunctions) {

    this.oldPassword = "Enter Old Password";
    this.newPassword = "Enter New Password";

    this.editAccountForm = new FormGroup({

      firstName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      firstMiddleName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      secondMiddleName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      email: new FormControl('', [Validators.required, Validators.maxLength(70), Validators.pattern(this.emailValidationPattern)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[0-9]*$")]),
      nationalID: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[0-9]*$")]),
      jobTitle: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      country: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      province: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),
      street: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")]),

    });

    this.editPasswordForm = new FormGroup({

      password: new FormControl('', [Validators.required, Validators.min(1), Validators.max(15), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]),
      newPassword: new FormControl('', [Validators.required, Validators.min(1), Validators.max(15), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]),

    });

    }

    ngOnInit(): void {
      this.langVar = this.langHelper.initializeMode();
      this.currentLang = this.langHelper.currentLang;
      this.LoadUserAccount();
      console.log(this.currentLang);
    }

    LoadUserAccount() {
      //fetch user details via session token
      this.authService.GetAccountViaToken().subscribe(res => {
        if (res.succeeded) {
          this.client = res.data;
        }
      }, error => {
        this.toastr.error('Unable to fetch account details', 'Error', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);
      });
    }

    SwitchViews() {

      if (this.isChangingPassword == true) {
        this.isChangingPassword = false;
      }
      else {
        this.isChangingPassword = true;
      }

      console.log(this.isChangingPassword);
    }

    EditAccountDetails(){
      const accountToEdit: EditCustomerModel = {
        id: this.client.id,
        email: this.editAccountForm.value.email,
        phoneNumber: this.editAccountForm.value.phoneNumber,
        first: this.editAccountForm.value.firstName,
        firstMiddle: this.editAccountForm.value.firstMiddleName,
        secondMiddle: this.editAccountForm.value.secondMiddleName,
        last: this.editAccountForm.value.lastName,
        accountStatus: this.client.customer.accountStatus,
        city: this.client.customer.city,
        country: this.client.customer.country,
        dateOfBirth: this.client.customer.dateOfBirth,
        gender: this.client.customer.gender,
        jobTitle: this.client.customer.jobTitle,
        nationalID: this.client.customer.nationalID,
        province: this.client.customer.province,
        street: this.client.customer.street,
        type: this.client.customer.type,
      }

      console.log(accountToEdit);

      this.customerService.EditAccountDetails(accountToEdit).subscribe(res => {
        if(res.succeeded){
          this.modalComponent.preloader.hide();
          this.editAccountConfirmationModal.hide();
          this.toastr.success('Profile information successfully updated !', 'Success', {
            disableTimeOut: false,
            closeButton: true,
            positionClass: 'toast-top-center'
          });
          this.isEditingAccount = false;
        }
      }, error => {
          this.modalComponent.preloader.hide();
          this.editAccountConfirmationModal.hide();
        this.toastr.error('Failed to updated profile information', 'Error', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
        this.LoadUserAccount();
      });




    }

    DisplayEditPasswordConfirmationModal() {
    this.editPasswordConfirmationModal.show();
  }

    DisplayEditAccountConfirmationModal() {
    this.editAccountConfirmationModal.show();
    }

    EditPassword() {

    const editPasswordModel: ChangePasswordModel = {
      accountID: this.client.id,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }

    this.accountService.ChangePassword(editPasswordModel).subscribe(res => {
      if (res.succeeded) {
        this.modalComponent.preloader.hide();
        console.log("password changed successfully !");
        this.editPasswordConfirmationModal.hide();
        this.toastr.success('Password updated', 'Success', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
        this.isEditingAccount = false;
      }
    }, error => {
      console.log("Failed to change password!");
        this.modalComponent.preloader.hide();
        this.editPasswordConfirmationModal.hide();
      this.toastr.error('Failed update password', 'Error', {
        disableTimeOut: false,
        closeButton: true,
        positionClass: 'toast-top-center'
      });
      this.LoadUserAccount();
    });

  }

    EnableEdit() {

      if (this.isEditingAccount == true) {
        this.isEditingAccount = false;
      }
      else {
        this.isEditingAccount = true;
      }


      console.log("-------------------------------");
      console.log(this.editAccountForm.controls.firstName.valid);
      console.log(this.editAccountForm.controls.firstMiddleName.valid);
      console.log(this.editAccountForm.controls.secondMiddleName.valid);
      console.log(this.editAccountForm.controls.lastName.valid);
      console.log(this.editAccountForm.controls.email.valid);
      console.log(this.editAccountForm.controls.phoneNumber.valid);
      console.log(this.editAccountForm.controls.phoneNumber.valid);
      console.log(this.editAccountForm.controls.nationalID.valid);
      console.log(this.editAccountForm.controls.jobTitle.valid);
      console.log(this.editAccountForm.controls.city.valid);
      console.log(this.editAccountForm.controls.province.valid);
      console.log(this.editAccountForm.controls.city.valid);
      console.log(this.editAccountForm.controls.street.valid);


  }

    ModalResponse(event) {
      this.modalComponent.confirmationModal.hide();
      this.modalComponent.preloader.show();
      if (ModalResponse[event] == 'Edit') { // cancel service request
        this.EditAccountDetails();
      }
    }

    get editAccountFormControls(){
      return this.editAccountForm.controls;
    }

    get f() {
      return this.editAccountForm.controls;
    }

    get l() {
      return this.editPasswordForm.controls;
  }

    SelectNationalIdFront() {
    this.uploadNationalIdFrontModal.show();
  }

    SelectNationalIdBack() {
    this.uploadNationalIdBackModal.show();
  }

    SelectProfilePicture() {
    this.uploadProfilePictureModal.show();
    }

    replaceNationalIdFront(event) {
      this.helperFunctions.handleFileSelect(event)
      setTimeout(() => {
        this.uploadedNationalIdImageFront = this.helperFunctions.currentImg;
        const newImage: EditImageModel = {
          id: this.client.id,
          image: this.uploadedNationalIdImageFront
        }
        setTimeout(() => {
          this.uploadNationalIdFrontModal.hide();
          this.modalComponent.preloader.show();
          this.customerService.EditNationalIdFront(newImage).subscribe(res => {
            if (res.succeeded) {
              this.modalComponent.preloader.hide();
              this.LoadUserAccount();
              this.toastr.success('Image Uploaded', 'Success', {
                disableTimeOut: false,
                closeButton: true,
                positionClass: 'toast-top-center'
              });
              this.uploadedNationalIdImageFront = "./assets/img/image_placeholder.jpg";
              //Display success toast
          
            }
          }, error => {
              this.toastr.error('Failed to upload, Please try again !', 'Error', {
                disableTimeOut: false,
                closeButton: true,
                positionClass: 'toast-top-center'
              });
            this.modalComponent.preloader.hide();
            this.uploadNationalIdFrontModal.hide();
            this.uploadedNationalIdImageFront = "./assets/img/image_placeholder.jpg";
            console.log(error);
          });
        }, 1000);
      }, 20);
    }

    replaceNationalIdBack(event) {
      this.helperFunctions.handleFileSelect(event)
      setTimeout(() => {
        this.uploadedNationalIdImageBack = this.helperFunctions.currentImg;
        const newImage: EditImageModel = {
          id: this.client.id,
          image: this.uploadedNationalIdImageBack
        }
        setTimeout(() => {
          this.uploadNationalIdBackModal.hide();
          this.modalComponent.preloader.show();
          this.customerService.EditNationalIdBack(newImage).subscribe(res => {
            if (res.succeeded) {
              this.modalComponent.preloader.hide();
              this.LoadUserAccount();
              this.toastr.success('Image Uploaded', 'Success', {
                disableTimeOut: false,
                closeButton: true,
                positionClass: 'toast-top-center'
              });
              this.uploadedNationalIdImageBack = "./assets/img/image_placeholder.jpg";
              //Display success toast

            }
          }, error => {
              this.toastr.error('Failed to upload, Please try again !', 'Error', {
              disableTimeOut: false,
              closeButton: true,
              positionClass: 'toast-top-center'
            });
            this.modalComponent.preloader.hide();
            this.uploadNationalIdBackModal.hide();
            this.uploadedNationalIdImageBack = "./assets/img/image_placeholder.jpg";
            console.log(error);
          });
        }, 1000);
      }, 20);
  }

    replaceProfilePicture(event) {
    this.helperFunctions.handleFileSelect(event)
    setTimeout(() => {
      this.uploadedProfilePicture = this.helperFunctions.currentImg;
      const newImage: EditImageModel = {
        id: this.client.id,
        image: this.uploadedProfilePicture
      }
      setTimeout(() => {
        this.uploadProfilePictureModal.hide();
        this.modalComponent.preloader.show();
        this.customerService.EditProfilePicture(newImage).subscribe(res => {
          if (res.succeeded) {
            this.modalComponent.preloader.hide();
            this.LoadUserAccount();
            this.toastr.success('Image Uploaded', 'Success', {
              disableTimeOut: false,
              closeButton: true,
              positionClass: 'toast-top-center'
            });
            this.uploadedProfilePicture = "./assets/img/image_placeholder.jpg";
            //Display success toast

          }
        }, error => {
          this.toastr.error('Failed to upload, Please try again !', 'Error', {
            disableTimeOut: false,
            closeButton: true,
            positionClass: 'toast-top-center'
          });
          this.modalComponent.preloader.hide();
          this.uploadProfilePictureModal.hide();
          this.uploadedProfilePicture = "./assets/img/image_placeholder.jpg";
          console.log(error);
        });
      }, 1000);
    }, 20);
  }

}
