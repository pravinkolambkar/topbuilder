import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MyErrorStateMatcher } from './job-title.component';
import { JobPostService } from '../../services/jobPost.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-contact-details',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  contactDetailsForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required])
  });    
  matcher = new MyErrorStateMatcher();
  
  @Output() optionChanged = new EventEmitter<number>();

  constructor(private jobPostService: JobPostService){}

  ngOnInit(){
    if(this.jobPostService.JobPost.JobStatic?.FirstName){
      this.contactDetailsForm.patchValue({firstName: this.jobPostService.JobPost.JobStatic?.FirstName});
    }
    if(this.jobPostService.JobPost.JobStatic?.LastName){
      this.contactDetailsForm.patchValue({lastName: this.jobPostService.JobPost.JobStatic?.LastName});
    }
    if(this.jobPostService.JobPost.JobStatic?.Email){
      this.contactDetailsForm.patchValue({email: this.jobPostService.JobPost.JobStatic?.Email});
    }
    if(this.jobPostService.JobPost.JobStatic?.Mobile){
      this.contactDetailsForm.patchValue({mobile: this.jobPostService.JobPost.JobStatic?.Mobile});
    }
  }

  ngAfterViewInit(){  
      this.optionChanged.emit(-1);
  }  

  ngOnDestroy(): void {
    console.log(this.contactDetailsForm.value);    
    if(this.contactDetailsForm.value!== null){
      if(this.contactDetailsForm.controls["firstName"].value!== null && 
      this.contactDetailsForm.controls["lastName"].value!== null && 
      this.contactDetailsForm.controls["email"].value!== null &&
      this.contactDetailsForm.controls["mobile"].value!== null){        
        this.jobPostService.setJobContactDetails(this.contactDetailsForm.controls["firstName"].value,
        this.contactDetailsForm.controls["lastName"].value,
        this.contactDetailsForm.controls["email"].value,
        this.contactDetailsForm.controls["mobile"].value);
        console.log(this.jobPostService.JobPost);
      }
    }
  }

  // getErrorMessage() {
  //   if (this.contactDetailsForm.controls["firstName"].hasError('required')) {
  //     return 'Please enter your first name';
  //   } else if (this.contactDetailsForm.controls["email"].hasError('required')) {
  //     return 'Please enter your email';
  //   } else if (this.contactDetailsForm.controls["email"].hasError('email')){
  //     return 'Not a valid email';
  //   } else if(this.contactDetailsForm.controls["mobile"].hasError('required')){
  //     return 'Please enter your mobile number';
  //   } else {
  //     return '';
  //   }
  // }
}
