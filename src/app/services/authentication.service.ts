import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { LoginModel } from '../models/auth-models/LoginModel';
import { RegisterModel } from '../models/auth-models/RegisterModel';
import { ApiResponse } from '../models/http-models/api-response';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    jwtHelper = new JwtHelperService();

    setToken(token: string) {
        localStorage.setItem("access_token", token);
    }

    getToken(): string {
        const token = localStorage.getItem("access_token");
        if (token) {
            return token;
        }
    }

    getUserRole(): string {
        const token = this.getToken();
        if (token) {
            const { role } = this.jwtHelper.decodeToken(token);
            return role;
        }
    }


    removeToken(): void {
        localStorage.removeItem("access_token");
    }

    isAuthenticated(): boolean {
        try {
            const token = this.getToken();
            if (token && !this.jwtHelper.isTokenExpired(token)) {
                return true;
            }
            return false;
        }
        catch {
            return false;
        }
    }

    isInRole(roleName: string): boolean {
        const token = this.getToken();
        if (token) {
            let roles: string[];
            const { role } = this.jwtHelper.decodeToken(token);
            roles = role;
            const res = roles.includes(roleName);
            if (res) {
                return true;
            }
        }
        return false;
    }
    GetAccountViaToken(token: string): Observable<ApiResponse> {
        return this.get(API_CONSTANTS.GetUserAccountByToken + token);
    }

    login(model: LoginModel): Observable<ApiResponse> {
        return this.post(API_CONSTANTS.Login, model);
    }

    //Register(model: AddCustomerModel): Observable<ApiResponse> {
    //  return this.post(API_CONSTANTS.CREATE_ADMIN_ACCOUNT, model);
    //}

    //logout(): Observable<ApiResponse> {
    //    return this.get(API_CONSTANTS.LOGOUT);
    //}

}
