import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import tradepersonjobData from 'src/assets/JsonFiles/TradePersonJobs.json';
import { TradepersonJob } from '../../models/tradepersonjob.model';

import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { QuestionsService } from 'src/app/post-a-job/services/questions.service';
import { OptionsService } from 'src/app/post-a-job/services/options.service';

@Component({
  selector: 'app-find-tradeperson',
  imports: [ MaterialModule, FormsModule, CommonModule ],
  templateUrl: './find-tradeperson.component.html',
  styleUrls: ['./find-tradeperson.component.css']
})
export class FindTradePersonComponent implements OnInit{
  @ViewChild('myForm') form!: NgForm;
  
  tradepersons: TradepersonJob[] = [];
  filteredTradeperson: TradepersonJob[] | undefined = undefined;
  selectedTradeperson: TradepersonJob | undefined;
  selectedTradepersonId: number | any;
  jobs: TradepersonJob[] = [];
  filteredJob: TradepersonJob[] | undefined = undefined;
  selectedJob: TradepersonJob | undefined;
  selectedJobId: number | any;
  startQuestionId: number | undefined;
  // selectedTrade: number | string = 1;

  constructor(private router: Router, 
    private questionService: QuestionsService,
    private optionsService: OptionsService,
    private http: HttpClient) {};

  ngOnInit() {
    this.questionService.getQuestions();
    this.optionsService.getOptions();
    this.getfilteredTradepersons();
    console.log(this.filteredTradeperson);
  };

  getfilteredTradepersons() {
    this.tradepersons = tradepersonjobData;
    console.log(this.tradepersons);
    this.filteredTradeperson = this.tradepersons.filter(
      (trperson) => trperson.ParentId === null
    );
  }

  onTradepersonSelect(event: any) {
    this.selectedTradepersonId = event;
    console.log(this.selectedTradepersonId);
    this.getfilteredJobs();
  }

  getfilteredJobs() {
    const data = tradepersonjobData;
    //console.log(this.selectedTradepersonId);
    console.log(data);    
    this.filteredJob = data.filter(tp => tp.ParentId == this.selectedTradepersonId);
    console.log(this.filteredJob);
  }

  onJobSelect(event: any) {
    console.log(event);
    this.selectedJobId = event;
    console.log(this.selectedJobId);

    const selectedJob = tradepersonjobData.find(tp => tp.Id == this.selectedJobId);
    console.log(this.selectedJob);

    if(selectedJob){
      if(selectedJob.StartQuestionId){
        this.startQuestionId = selectedJob.StartQuestionId;
        console.log(this.startQuestionId);
      }
    }
  }

  onSubmit() {
    console.log(this.selectedTradepersonId);
    console.log(this.selectedJobId);
    this.router.navigate(['/post-a-job', this.selectedTradepersonId, this.selectedJobId, this.startQuestionId]);
  }

}
