import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { DeleteObjectModel } from '../models/Request/delete-object-model';
import { API_CONSTANTS } from './shared-services/api-constants';
import { BaseService } from './shared-services/base-service';


@Injectable({
    providedIn: 'root'
})
export class NewsletterService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }


  subscribeEmail(requestID: DeleteObjectModel): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.AddNewslettersubscriber, requestID);
    }
}
