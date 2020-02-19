import { Component, OnInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, DoCheck {
  // get ngx-bootstrap nav toggle in angular
  public collapse = true;
  // navbar title
  title = 'WeMet!';
  // obj to accept form inputs
  model: any = {};

  // better ngx navbar:
  // https://github.com/Totati/ngx-bootstrap-navbar#readme
  checked = 0;
  ngDoCheck() {
    console.log(++this.checked);
  }

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
