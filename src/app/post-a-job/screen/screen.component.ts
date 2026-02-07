import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Options } from '../models/options.model';
import { NgIf } from "@angular/common";
import { DynamicComponent } from "./dynamic/dynamic.component";
import { JobtitleComponent } from "./static/job-title.component";
import { DescribeComponent } from "./static/describe.component";
import { AddPhotosComponent } from "./static/add-photos.component";
import { BudgetComponent } from "./static/budget.component";
import { ContactDetailsComponent } from "./static/contact-details.component";
import { JobplaceComponent } from "./static/jobplace.component";
import { JobTermsComponent } from "./static/job-terms.component";

@Component({
    selector: 'app-screen',
    imports: [ DynamicComponent, JobtitleComponent, DescribeComponent, AddPhotosComponent, BudgetComponent, ContactDetailsComponent, JobplaceComponent, JobTermsComponent ,NgIf],
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.css']
  })
  export class ScreenComponent implements OnInit{
    @Input() questionTitle = '';
    @Input() options: Options[] = [];
    @Input() selectedOptionId: number = -1;
    @Input() screenType= '';
    @Output() optionChanged = new EventEmitter<number>();
    
    ngOnInit(): void {    
    }

    changeOption(event: any){
        this.selectedOptionId = event;
        console.log("emit from screen");
        this.optionChanged.emit(this.selectedOptionId);
    }    
  }