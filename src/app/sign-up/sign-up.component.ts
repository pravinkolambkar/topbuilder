import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ MaterialModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    trade: new FormControl('Builder'),
    empNos: new FormControl('Just me')
  });

  selectedTrade = 'Builder';
  selectedEmpno = 'Just Me';

  constructor() {}

  ngOnInit(): void {}

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  onSubmit() {
    // Add your sign-in logic here
    console.log('Signing in...');
  }
}
