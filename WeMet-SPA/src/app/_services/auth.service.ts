import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  // var to hold logged in username decoded from token
  decodedToken: any;

  constructor(private http: HttpClient) {}
    // take json web token response (observable) as key/value pair object(tokenKey:"tokenValue") and convert to rjsx operator via .pipe():
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          // decode token to display username in navbar
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
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
