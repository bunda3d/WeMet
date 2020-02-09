import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
// import { User } from '../_models/user';
import { Router } from '@angular/router';

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
  // user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  // bring in auth service, import AuthService up top
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }
  // register via AuthService, return http response from service whether or not it was successful

  /**
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('Registration successful');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        }
      );
    }
  }
  */
  

  cancel() {
    this.cancelRegister.emit(false);
    // console.log('cancelled');
  }

}

/**
old auth register model 
  this.authService.register(this.model).subscribe(() => {
    this.alertify.success('registration successful');
    // console.log('registration successful');
  }, error => {
    this.alertify.error(error);
    // console.log(error);
  });
}
*/
