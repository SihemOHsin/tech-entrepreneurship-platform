import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }


  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }


  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      console.log(decodedToken.authorities);
      return decodedToken.authorities;
    }
    return [];
  }

  get userId(): number | null {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      console.log(decodedToken.userId);
      return decodedToken.userId;
    }
    return null;
  }

  getUserEmailFromToken(): string | null {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken ? decodedToken.sub : null; // Assuming `sub` contains the email
    }
    return null;
  }


  // Convert blob to JSON
   blobToJson(blob: Blob): Observable<any> {
    return new Observable<any>((observer) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        observer.next(JSON.parse(reader.result as string));
        observer.complete();
      };
      reader.readAsText(blob);
    });
  }
}
