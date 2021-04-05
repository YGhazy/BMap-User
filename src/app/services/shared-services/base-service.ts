 import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
 import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/http-models/api-response';
 import { Observable } from 'rxjs';

 export class BaseService {

   private apiUrl: string;
   private imageServerUrl: string;
     private httpHeaders: HttpHeaders;
     private httpOptions!: {} 

   constructor(private http: HttpClient) {
     this.apiUrl = environment.apiBaseUrl;
     this.imageServerUrl = environment.imageHandlerServerBaseUrl;
         this.httpHeaders = new HttpHeaders({
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Accept-Language': 'en'
         });
     }

     protected get(url: string, params?: HttpParams) : Observable<ApiResponse> {
         this.httpOptions = { 
             headers: this.httpHeaders,
             params: params,
             withCredentials: true
         };
         return this.http.get<ApiResponse>(this.apiUrl + url, this.httpOptions);
     }

     protected post(url: string, data: any, params?: HttpParams) : Observable<ApiResponse> {
         this.httpOptions = {
             headers: this.httpHeaders,
             params: params,
             withCredentials: true
         };
         return this.http.post<ApiResponse>(this.apiUrl + url, data, this.httpOptions);
     }
     protected postToImageHandler(url: string, data: any): Observable<object> {
       return this.http.post(this.imageServerUrl + url, data);
     }
     protected DeleteAdminImage(data: any): Observable<object> {
       return this.http.post('http://localhost:3000/api/RemoveAdminImage', data); //TODO Fix link.
     }
     protected DeleteUserImage(data: any): Observable<object> {
       return this.http.post('http://localhost:3000/api/RemoveUserImage', data);
     }
 }
