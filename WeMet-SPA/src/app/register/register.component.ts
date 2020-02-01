import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  // output = 4 things: 1. var = new event emitter, 2. a method with something to emit (cancel(emit:false)) that emits
  // 3. in home component html set (output)="method($event)"
  // 4. in home component ts add boolean method to toggle cancel value from other cancel method.
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
