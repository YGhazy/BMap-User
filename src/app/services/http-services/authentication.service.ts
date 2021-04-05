import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseService } from '../shared-services/base-service';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends BaseService {

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService,) {
    super(httpClient);

  }

  setToken(token: string) {
      localStorage.setItem("access_token", token);
  }

  getToken(): string {
      const token = localStorage.getItem("access_token");
      if (token) {
          return token;
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

  //isInRole(roleName: string): boolean {
  //    const token = this.getToken();
  //    if (token) {
  //        let roles: string[];
  //        const { role } = this.jwtHelper.decodeToken(token);
  //        roles = role;
  //        const res = roles.includes(roleName);
  //        if (res) {
  //            return true;
  //        }
  //    }
  //    return false;
  //}

}
