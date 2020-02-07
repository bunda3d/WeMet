import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}
    // take json web token response (observable) as key/value pair object(tokenKey:"tokenValue") and convert to rjsx operator via .pipe():
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }
  // will return observable that needs subscribed to in register component
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    // get token from local storage
    const token = localStorage.getItem('token');
    // use jwt helper service, if token is NOT expired (!this) will return "true" bool.
    return !this.jwtHelper.isTokenExpired(token);
    }
}