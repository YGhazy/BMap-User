import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { Customer } from '../models/http-models/customer';
import { DeleteObjectModel } from '../models/http-models/delete-object-model';
import { EditImageModel } from '../models/http-models/edit-image-model';
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

    EditProfilePicture(newImage: EditImageModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.EditProfilePicture, newImage);
    }
}
