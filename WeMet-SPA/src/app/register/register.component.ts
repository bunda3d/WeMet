import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // input of values from api
  // @Input() valuesFromHome: any;
  // output = 4 things: 1. var = new event emitter, 2. a method with something to emit (cancel(emit:false)) that emits
  // 3. in home component html set (output)="method($event)"
  // 4. in home component ts add boolean method to toggle cancel value from other cancel method.
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  // bring in auth service, import AuthService up top
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  // register via AuthService, return http response from service whether or not it was successful
  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration successful');
      // console.log('registration successful');
    }, error => {
      this.alertify.error(error);
      // console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    // console.log('cancelled');
  }

}
