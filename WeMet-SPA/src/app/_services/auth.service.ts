import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

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
}
