import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/auth-models/RegisterModel';
import { ApiResponse } from '../models/http-models/api-response';
import { ApplicationUser } from '../models/http-models/application-user';
import { Customer } from '../models/http-models/customer';
import { DeleteObjectModel } from '../models/http-models/delete-object-model';
import { EditImageModel } from '../models/http-models/edit-image-model';
import { EditAccountDetails } from '../models/Request/edit-account-details';
import { EditCustomerModel } from '../models/Request/edit-customer-model';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    GetAllCustomers(): Observable<ApiResponse> {
       return this.get(API_CONSTANTS.GetAllCustomers);
    }

    EditAccountDetails(accountToEdit: EditCustomerModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.EditCustomer, accountToEdit);
    }

    EditProfilePicture(newImage: EditImageModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.EditProfilePicture, newImage);
    }

    EditNationalIdFront(newImage: EditImageModel): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.EditNationalIdFront, newImage);
    }

    EditNationalIdBack(newImage: EditImageModel): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.EditNationalIdBack, newImage);
    }


    Register(registerModel: RegisterModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.Register, registerModel);
    }


}
