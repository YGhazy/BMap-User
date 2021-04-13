import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { Bank } from '../models/http-models/bank';
import { Customer } from '../models/http-models/customer';
import { DeleteObjectModel } from '../models/http-models/delete-object-model';
import { EditBankImageModel } from '../models/http-models/edit-bank-image-model';
import { EditImageModel } from '../models/http-models/edit-image-model';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
    providedIn: 'root'
})
export class BankService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    GetAllBanks(): Observable<ApiResponse> {
       return this.get(API_CONSTANTS.GetAllBanks);
    }
}
