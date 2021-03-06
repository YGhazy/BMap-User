import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../app/models/http-models/api-response';
import { environment } from '../../../environments/environment';

export class BaseService {

    private apiUrl: string;
    private imageServerUrl: string;
    private httpHeaders: HttpHeaders;
    private httpOptions: {}

    constructor(private http: HttpClient) {
      this.apiUrl = environment.apiBaseUrl;
      this.httpHeaders = new HttpHeaders({
              'enctype': 'multipart/form-data',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Accept-Language': 'en'
          });
    }

    protected get(url: string, params?: HttpParams) : Observable<ApiResponse> {
        this.httpOptions = { 
            headers: this.httpHeaders,
            params: params,
            withCredentials: false
        };
        return this.http.get<ApiResponse>(this.apiUrl + url, this.httpOptions);
    }

    protected post(url: string, data: any, params?: HttpParams) : Observable<ApiResponse> {
        this.httpOptions = {
            headers: this.httpHeaders,
            params: params,
            withCredentials: false
        };
        return this.http.post<ApiResponse>(this.apiUrl + url, data, this.httpOptions);
    }
    protected put(url: string, data: any, params?: HttpParams) : Observable<ApiResponse> {
        this.httpOptions = {
            headers: this.httpHeaders,
            params: params,
            withCredentials: false
        };
        return this.http.put<ApiResponse>(this.apiUrl + url, data, this.httpOptions);
    }

    protected postToImageHandler(url: string, data: any): Observable<object> {
      return this.http.post(this.apiUrl + url, data);
    }
}
