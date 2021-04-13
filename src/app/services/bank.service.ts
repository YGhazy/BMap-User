import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { Bank } from '../models/Request/bank';
import { DeleteObjectModel } from '../models/Request/delete-object-model';
import { API_CONSTANTS } from './shared-services/api-constants';
import { BaseService } from './shared-services/base-service';



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
