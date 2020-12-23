import { Injectable } from '@angular/core';
import { BaseService } from '../services/shared-services/base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { API_CONSTANTS } from '../services/shared-services/api-constants';
import { GalleryItemToCreateDTO } from '../models/DTOs/gallery-itemToCreate';
@Injectable({
  providedIn: 'root'
})

  //Component Services inherit from Base service for HTTP CRUD operations
  // Observable functions call their corresponding End-Point API Constants
export class GalleryItemService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }


  GetGalleryItems(): Observable<ApiResponse> {   // Get all gallery items
    return this.get(API_CONSTANTS.GALLERY_GET_ITEMS);
  }

  CreateGalleryItem(galleryItemToCreate: GalleryItemToCreateDTO): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.GALLERY_CREATE_GALLERY_ITEM, galleryItemToCreate);
  }

}
