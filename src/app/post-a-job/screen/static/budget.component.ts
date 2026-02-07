import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { JobPostService } from '../../services/jobPost.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-budget',
  imports: [MaterialModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy, AfterViewInit{    
    @Output() optionChanged = new EventEmitter<number>();
    selectedBudget = '250'; 

    constructor(private jobPostService: JobPostService){}
  
    ngOnInit(): void {     
      if(this.jobPostService.JobPost.JobStatic?.Budget){
        this.selectedBudget = this.jobPostService.JobPost.JobStatic?.Budget;
      }   
    }

    ngAfterViewInit(): void {
      this.optionChanged.emit(-1); 
    }

    ngOnDestroy(): void {      
        this.jobPostService.setJobBudget(this.selectedBudget);
    } 
}
