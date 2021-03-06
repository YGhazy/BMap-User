import { Component, OnInit, ViewChild } from '@angular/core';
import { langHelper } from 'src/app/services/utilities/language-helper';
import AOS from 'aos';
import { ServiceRequest } from 'src/app/models/http-models/service-request';
import { ServicesService } from 'src/app/services/ServicesService';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApplicationUser } from 'src/app/models/http-models/application-user';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModalResponse } from 'src/app/enums/modal-response';
import { DeleteObjectModel } from 'src/app/models/http-models/delete-object-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  langVar;
  currentLang;
  requestedServices: ServiceRequest[];
  client: ApplicationUser;
  selectedRequestID: number;

  //Modal
  @ViewChild(ModalComponent) modalComponent: ModalComponent;

  constructor(private langHelper: langHelper, private router: Router, private serviceRequestService: ServicesService, private authService: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
    AOS.refresh();
    this.LoadServiceRequests();
  }

  //fetch customer service requests via session token
  LoadServiceRequests() {
    //fetch user details via session token
    this.authService.GetAccountViaToken().subscribe(res => {
      if (res.succeeded) {
        this.client = res.data;
        console.log(res.data);
        //fetch customer service requests
        this.serviceRequestService.GetCustomerServiceRequests(this.client.customer.id).subscribe(res => {
          if (res.succeeded) {
            console.log(res.data)
            this.requestedServices = res.data;
          }
        }, error => {
          console.log("error fetching service requests");
        });
      }
    }, error => {
      this.toastr.error(this.langVar.response.unableToFetchAccDetails, this.langVar.response.error, {
        disableTimeOut: false,
        closeButton: true,
        positionClass: 'toast-top-center'
      });
      this.router.navigate(['/login']);
    });
  }

  CancelPendingRequest() {
    const requestToCancel: DeleteObjectModel = {
      id: this.selectedRequestID
    }
    this.serviceRequestService.DeleteServiceRequest(requestToCancel).subscribe(res => {
      if (res.succeeded) {
        this.modalComponent.preloader.hide();
        this.requestedServices = this.requestedServices.filter(rs => rs.id != this.selectedRequestID);
        //Display success toast
        this.toastr.success(this.langVar.response.reqCancelled, this.langVar.response.success, {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
      }
    }, error => {
      this.modalComponent.preloader.hide();
      this.toastr.error(this.langVar.response.unableToCancelReq, this.langVar.response.error, {
        disableTimeOut: false,
        closeButton: true,
        positionClass: 'toast-top-center'
      });
    });
  }
  //Display modal component's confirmation modal for cancellation
  DisplayCancellationConfirmation(requestID: number) {
    this.selectedRequestID = requestID;
    if(this.currentLang == 'en'){
      this.modalComponent.DisplayConfirmationModal('Cancel service request', 'Are you sure you want to cancel this request? this action is irreversible', 2);
    }
    else{
      this.modalComponent.DisplayConfirmationModal('?????????? ?????? ????????????', '???? ?????? ?????????? ?????? ???????? ?????????? ?????? ???????????? ?????? ?????????? ???? ???????? ??????', 2);
    }
  }

  DisplayRejectionReason(requestID: number){
    this.modalComponent.showRejectionReason(this.requestedServices.find(s => s.id == requestID).rejectionReason);
  }

  ModalResponse(event) {
    this.modalComponent.confirmationModal.hide();
    this.modalComponent.preloader.show();
    if (ModalResponse[event] == 'Delete') { // cancel service request
      this.CancelPendingRequest();
    }
  }
}
