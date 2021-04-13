import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from '../models/http-models/api-response';
import { ChangePasswordModel } from '../models/Request/change-password-model';
import { EditAccountDetails } from '../models/Request/edit-account-details';
import { API_CONSTANTS } from './shared-services/api-constants';
import { BaseService } from './shared-services/base-service';



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
