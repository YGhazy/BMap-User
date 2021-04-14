import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { Bank } from '../models/http-models/bank';
import { Customer } from '../models/http-models/customer';
import { DeleteObjectModel } from '../models/http-models/delete-object-model';
import { EditImageModel } from '../models/http-models/edit-image-model';
import { NewsletterSubscription } from '../models/http-models/newsletter-subscription';
import { CreateNewsletterSubscription } from '../models/Request/create-newsletter-subscription';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
    providedIn: 'root'
})
export class NewsletterService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    SubscribeNewsletter(request: CreateNewsletterSubscription): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.SubscribeNewsletter, request);
    }
}
