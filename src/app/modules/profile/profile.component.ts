import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalResponse } from 'src/app/enums/modal-response';
import { ApplicationUser } from 'src/app/models/http-models/application-user';
import { Customer } from 'src/app/models/http-models/customer';
import { EditCustomerModel } from 'src/app/models/Request/edit-customer-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomerService } from 'src/app/services/customer.service';
import { formBuilderHelper } from 'src/app/services/utilities/formBuilderHelper';
import { langHelper } from 'src/app/services/utilities/language-helper';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  client: ApplicationUser;
  isEditingAccount: boolean = false;
  isChangingPassword: boolean = false;
  langVar;

  //FormGroup
  editAccountForm;

  //Modal
  @ViewChild(ModalComponent) modalComponent: ModalComponent;
  constructor(private authService: AuthenticationService, private customerService: CustomerService, private langHelper: langHelper,
     private toastr: ToastrService, private router: Router, private formBuilderHelper: formBuilderHelper) { 

      this.editAccountForm = this.formBuilderHelper.CreateFormBuilder({
        firstName: '',
        firstMiddleName: '',
        secondMiddleName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
      });
  }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
    this.LoadUserAccount();
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


    EditAccountDetails(){
      const accountToEdit: EditCustomerModel = {
        id: this.client.id,
        email: this.editAccountForm.value.email,
        phoneNumber: this.editAccountForm.value.mobileNumber,
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
        profilePicture: this.client.customer.profilePicture, //Adjust profile image on edit??
        nationalIdBack: this.client.customer.nationalIdBack,
        nationalIdFront: this.client.customer.nationalIdFront,
        province: this.client.customer.province,
        street: this.client.customer.street,
        type: this.client.customer.type,
      }
      this.customerService.EditAccountDetails(accountToEdit).subscribe(res => {
        if(res.succeeded){
          this.modalComponent.preloader.hide();
          this.toastr.success('Account updated', 'Success', {
            disableTimeOut: false,
            closeButton: true,
            positionClass: 'toast-top-center'
          });
          this.isEditingAccount = false;
        }
      }, error => {
        this.modalComponent.preloader.hide();
        this.toastr.error('Unable to update account details', 'Error', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
        this.LoadUserAccount();
      });
    }

    DisplayConfirmationModal() {
      this.modalComponent.DisplayConfirmationModal('Edit account details', 'Are you sure you want edit this account details? this action is irreversible', 1);
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
}
