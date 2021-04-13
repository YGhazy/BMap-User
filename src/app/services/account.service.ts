import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordModel } from '../models/DTOs/change-password-model';
import { EditAccountDetails } from '../models/DTOs/edit-account-details';
import { ApiResponse } from '../models/http-models/api-response';
import { Bank } from '../models/http-models/bank';
import { Customer } from '../models/http-models/customer';
import { DeleteObjectModel } from '../models/http-models/delete-object-model';
import { EditImageModel } from '../models/http-models/edit-image-model';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
    providedIn: 'root'
})
export class AccountService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }


    ChangePassword(account: ChangePasswordModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.ChangeAccountPassword, account);
    }

}
