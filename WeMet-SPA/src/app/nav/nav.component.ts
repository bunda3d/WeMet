import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // get ngx-bootstrap nav toggle in angular
  public isCollapsed = true;
  // navbar title
  title = 'WeMet!';
  // obj to accept form inputs
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  // navbar dropdown methods
  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
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
    // console.log('logged out');
  }

}
