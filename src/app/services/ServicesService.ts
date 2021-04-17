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

    GetCustomerServiceRequests(customerID: number): Observable<ApiResponse> {
        return this.get(API_CONSTANTS.GetCustomerServiceRequests + customerID);
    }

    DeleteServiceRequest(requestID: DeleteObjectModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.DeleteServiceRequest, requestID);
    }

    SubmitServiceRequest(request: CreateServiceRequest): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.SubmitServiceRequest, request);
    }
}
