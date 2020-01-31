import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // var assists in toggling visibility of registration components
  registerMode = false;
  // values var gets values from .NET API
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
    this.values = response;
  }, error => {
      console.log(error);
  });
  }

}
