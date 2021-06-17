import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { CreateServiceModel } from '../models/http-models/CreateServiceModel';
import { CreateServiceTypeModel } from '../models/http-models/CreateServiceTypeModel';
import { DeleteObjectModel } from '../models/http-models/delete-object-model';
import { EditImageModel } from '../models/http-models/edit-image-model';
import { EditServiceModel } from '../models/http-models/EditServiceModel';
import { CreateServiceRequest } from '../models/Request/service-request';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';

@Injectable({
    providedIn: 'root'
})

export class ServicesService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    GetAllServices(): Observable<ApiResponse> {
        return this.get(API_CONSTANTS.GetAllServices);
    }
  GetAccountsService(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GetAccountsService);
    }
  GetCreditCardsService(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GetCreditCardsService);
    }
  GetLoansService(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GetLoansService);
    }
  GetInvestmentsService(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GetInvestmentsService);
  }
  GetPersonalLoansService(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GetPersonalLoansService);
    }

    GetCustomerServiceRequests(customerID: number): Observable<ApiResponse> {
        return this.get(API_CONSTANTS.GetCustomerServiceRequests + customerID);
    }
  GetServiceTypesById(serviceID: number): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GetAllServiceTypesByServiceID + serviceID);
  }
    DeleteServiceRequest(requestID: DeleteObjectModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.DeleteServiceRequest, requestID);
    }

    SubmitServiceRequest(request: CreateServiceRequest): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.SubmitServiceRequest, request);
  }

 CreateIslamicServiceRequest(request): Observable<ApiResponse> {
   return this.post(API_CONSTANTS.CreateIslamicServiceRequest, request);
  }
  CreateCorporateServiceRequest(request): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.CreateCorporateServiceRequest, request);
  }

}
