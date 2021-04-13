import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { Customer } from '../models/Request/customer';
import { EditImageModel } from '../models/Request/edit-image-model';
import { API_CONSTANTS } from './shared-services/api-constants';
import { BaseService } from './shared-services/base-service';



@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }


  EditCustomer(customerToEdit: Customer): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.EditCustomer, customerToEdit);
    }
    EditProfilePicture(newImage: EditImageModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.EditProfilePicture, newImage);
    }
}
