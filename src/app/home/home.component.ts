import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import tradepersonjobData from '../../assets/JsonFiles/TradePersonJobs.json';
import { TradepersonJob } from './models/tradepersonjob.model';
import { QuestionsService } from '../post-a-job/services/questions.service';
import { OptionsService } from '../post-a-job/services/options.service';
import { CommonModule, NgFor } from '@angular/common';
import { PopularJobsComponent } from './popular-jobs/popular-jobs.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgFor, PopularJobsComponent, OurServicesComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
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
  imageGroups: string[][] = [];
  active: any;
  
  constructor(private router: Router, 
    private questionService: QuestionsService,
    private optionsService: OptionsService,
    private http: HttpClient){      
    }

  ngOnInit(): void {
    this.questionService.getQuestions();
    this.optionsService.getOptions();
    
    this.getfilteredTradepersons();
    console.log(this.filteredTradeperson);

    // Load image URLs from the JSON file in the assets folder
    this.http.get('assets/Images/Home/homeImages.json').subscribe((data: any) => {
      if (data && data.imageGroups) {
        this.imageGroups = data.imageGroups;
      }
    });
  }

  // Function to generate the full image path
  getImagePath(imageName: string): string {
    return `assets/Images/Home/${imageName}`;
  }

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
    console.log(this.selectedTradepersonId);
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
