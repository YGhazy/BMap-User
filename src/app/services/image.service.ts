import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageToRemove } from '../models/DTOs/ImageToRemove';
import { API_CONSTANTS } from '../services/shared-services/api-constants';
import { BaseService } from '../services/shared-services/base-service';

@Injectable({
  providedIn: 'root'
})
//Component Services inherit from Base service for HTTP CRUD operations
// Observable functions call their corresponding End-Point API Constants
export class ImageService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  //Upload Image Helper
    // Upload Image Helper: uploads both user & admin images to the image handler server and returns the 2 paths in an array.
  UploadImageHelper(imageToUpload) {
    let promise = new Promise((resolve, reject) => {
      this.uploadUserImage(imageToUpload).toPromise().then(res => { // Observe and fetch image path result
        //Fetch and split image path into 'path.type'
        var path = res['U'][0].path;
        var splitted = path.split('uploads\\');
        var imgPathUser = splitted[1];
        this.uploadAdminImage(imageToUpload).toPromise().then(adminRes => {
          var path = adminRes['U'][0].path;
          var splitted = path.split('uploads\\');
          var imgPathAdmin = splitted[1];
          //console.log('admin img promise: ', imgPathAdmin)
          resolve([imgPathAdmin, imgPathUser]); // Return imagePath for user and admin as an array
        });
      });
    });
    return promise;
  }

  //Remove Image
   // *Receives original user & admin Image paths for the image server to delete from the uploads folder*
  RemoveImage(userImage, adminImage) {
    const userImageToRemove: ImageToRemove = {
      URL: userImage
    }
    const adminImageToRemove: ImageToRemove = {
      URL: adminImage
    }
    this.removeUserImage(userImageToRemove).subscribe(data => {
      console.log("user image:", userImage, " removed")
    }, error => {
      console.log("Image Server User Image Removal Error: ",error)
    });
    this.removeAdminImage(adminImageToRemove).subscribe(res => {
      console.log("admin image:", adminImage, " removed")
    }, error => {
        console.log("Image Server Admin Image Removal Error: ", error)
    }); 
  }

  //HTTP-Requests
  uploadUserImage(imageToUpload): Observable<Object> {
    return this.postToImageHandler(API_CONSTANTS.IMAGE_HANDLER_UPLOAD_USER_IMAGE, imageToUpload);
  }
  uploadAdminImage(imageToUpload): Observable<Object> {
    return this.postToImageHandler(API_CONSTANTS.IMAGE_HANDLER_UPLOAD_ADMIN_IMAGE, imageToUpload);
  }
  removeUserImage(imageToRemove: ImageToRemove): Observable<object> {
    return this.DeleteUserImage(imageToRemove);
  }
  removeAdminImage(imageToRemove: ImageToRemove): Observable<object> {
    return this.DeleteAdminImage(imageToRemove);
  }
}
