import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { JobPostService } from '../../services/jobPost.service';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-job-title',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.css']
})
export class JobtitleComponent implements OnInit, OnDestroy, AfterViewInit{   
    @Output() optionChanged = new EventEmitter<number>();
    jobTitleFormControl = new FormControl('', [Validators.required]);
    matcher = new MyErrorStateMatcher();

    constructor(private jobPostService: JobPostService){}
  
    ngOnInit(): void {        
      if(this.jobPostService.JobPost.JobStatic?.Title){
        this.jobTitleFormControl.setValue(this.jobPostService.JobPost.JobStatic?.Title);
      }
    }

    ngAfterViewInit(): void {
      this.optionChanged.emit(-1);      
    }

    ngOnDestroy(): void {
      console.log(this.jobTitleFormControl.value);
      if(this.jobTitleFormControl.value!== null){
        this.jobPostService.setJobTitle(this.jobTitleFormControl.value);
      }
    } 
}
