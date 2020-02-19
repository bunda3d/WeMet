import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
// import { Routes } from '../routes';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // better ng bootstrap navbar (no jquery):
  // https://ng-bootstrap.github.io/#/components/nav/examples
  // https://ng-bootstrap.github.io/#/components/collapse/examples
  // https://ng-bootstrap.github.io/#/components/dropdown/examples
  public collapse = true;
  // navbar title
  title = 'WeMet!';
  // obj to accept form inputs
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  // method to login; form input passed as model
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
      // console.log('Logged in successfully');
    }, error => {
      this.alertify.error(error);
      // console.log('Failed to login');
    });
  }

  // determine if user is logged in bool--if token is empty, return !!=false
  loggedIn() {
    return this.authService.loggedIn();
    // const token = localStorage.getItem('token');
    // return !!token;
  }
  // deletes token
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    return this.collapse;
    // console.log('logged out');
  }
}
