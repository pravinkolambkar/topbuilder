import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Options } from './models/options.model';
import { QuestionOption } from './models/questionoption.model';
import { JobPostQuestionOption } from './models/jobPostQuestionOption.model';
import { QuestionOptionsService } from './services/questionOptions.service';
import { QuestionsService } from './services/questions.service';
import { OptionsService } from './services/options.service';
import { JobPostService } from './services/jobPost.service';
import { ScreenComponent } from './screen/screen.component';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-job',
  imports: [ ScreenComponent, MaterialModule],
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.css']
})
export class PostJobComponent implements OnInit{
  selectedTradepersonId: number| undefined;
  selectedJobId: number | undefined;
  questionIndex: number = 0;  
  questionId: number | undefined;
  questionTitle: string = "";
  options: Options[] = []; 
  questionOptions: QuestionOption[]=[]; 
  selectedOptionId: number = -1;
  
  questionIds: number[]=[];
  selectedOptionIds: number[]=[];

  screenType="dynamic";
  progressValue=0;

  constructor(private route: ActivatedRoute, 
    private questionOptionsService: QuestionOptionsService,
    private questionsService: QuestionsService,
    private optionsService: OptionsService,
    private jobPostService: JobPostService) {}

  ngOnInit() {    
        // Load questions and options data
        this.questionsService.getQuestions();
        this.optionsService.getOptions();

        const tpId = this.route.snapshot.paramMap.get('selectedTradepersonId');
        if(tpId !== null){
            this.selectedTradepersonId = +tpId;
            console.log(this.selectedTradepersonId);
        }

        const jobId = this.route.snapshot.paramMap.get('selectedJobId');
        if(jobId !== null){
            this.selectedJobId = +jobId;
            console.log(this.selectedJobId);
        }

        const startQuestionId = this.route.snapshot.paramMap.get('startQuestionId');
        if(startQuestionId !== null && startQuestionId !== 'null' && startQuestionId !== 'undefined'){
            this.questionId = +startQuestionId;
            console.log('Start Question ID:', this.questionId);
        } else {
            // Default to first question if no start question is provided
            this.questionId = 1;
            console.log('No start question provided, defaulting to question 1');
        }

        this.questionOptionsService.questionOptions.subscribe(data => {
          console.log(data);
          this.questionOptions = data;
          console.log(this.questionId);
          if(this.questionId){
            this.SetQuestionIds();
            this.setQuestionTitle(this.questionId);
            this.setQuestionOptions(this.questionId);
            this.setScreenType();
            this.progressValue = 10;
          }
        });

        if(this.selectedTradepersonId)
        {
          this.questionOptionsService.setQuestionOptions(this.selectedTradepersonId);
        }

        this.jobPostService.setJobPostUser(100);
  }

  optionChanged(event: any){
    console.log(event);
    const optionId = event;
    if(optionId){
      this.selectedOptionId = optionId; 
      console.log("In option changed");
      this.SetQuestionIds();
      console.log(this.questionIds);
      this.setSelectedOptionIds(optionId);
      console.log(this.questionIds);
      console.log(this.selectedOptionIds);      
    }
  }

  SetQuestionIds(){
    console.log(this.questionId);
    if(this.questionId){      
      const questionIdIndex = this.questionIds.findIndex(element => element ==this.questionId);
      console.log(this.questionIds);
      console.log(questionIdIndex);
      if(questionIdIndex == -1){
        this.questionIds.push(this.questionId);                
      }
      this.setQuestionIndex(); 
      console.log(this.questionIds);
      console.log(this.questionIndex);
      console.log(this.questionIds.length);      
    }
  }

  setQuestionIndex(){
    const questionIdIndex = this.getQuestionIndex();
    if(questionIdIndex == -1){
      this.questionIndex = this.questionIds.length -1;
    } else {
      this.questionIndex =questionIdIndex;
    }
  }

  getQuestionIndex(){
    return this.questionIds.findIndex(element => element ==this.questionId);
  }

  setSelectedOptionIds(optionId: number){
    const questionIdIndex = this.getQuestionIndex();
    console.log(questionIdIndex);
    if(questionIdIndex > -1){
      this.selectedOptionIds[questionIdIndex] = optionId;
    }
    console.log(this.selectedOptionIds);
  }

  setScreenType(){
    if(this.questionId == 4){
      this.screenType = "jobtitle";
    } else if (this.questionId == 5){
      this.screenType = "describe";
    } else if (this.questionId == 6){
      this.screenType = "addphotos";
    } else if (this.questionId == 7){
      this.screenType = "budget";
    } else if (this.questionId == 8){
      this.screenType = "contactdetails";
    } else if (this.questionId == 9){
      this.screenType = "jobplace";
    } else if (this.questionId == 10){
      this.screenType = "jobterms";
    }     
    else {
      this.screenType = "dynamic";
    }
  }

  updateJobPost(selectedQuestionOption: QuestionOption){
    this.jobPostService.updateQuestionOption(new JobPostQuestionOption(-1, -1, selectedQuestionOption.Id, selectedQuestionOption));
  }

  forwardProgressValue(){
    this.progressValue = this.progressValue + 10;
  }
  backwardProgressValue(){
    this.progressValue = this.progressValue - 10;
  }

  goToNextQuestion() {
    console.log('Current Question ID:', this.questionId);
    console.log('Selected Option ID:', this.selectedOptionId);
    
    // For dynamic questions with selected options
    if(this.selectedOptionId && this.selectedOptionId !== -1){      
      const selectedQuestionOption = this.questionOptions.find(qo => 
        qo.TradePersonJobId == this.selectedJobId && 
        qo.OptionId == this.selectedOptionId && 
        qo.QuestionId == this.questionId
      );

      console.log('Selected Question Option:', selectedQuestionOption);
      if(selectedQuestionOption){
        console.log('Question Option found:', selectedQuestionOption);
        if(selectedQuestionOption.OptionId !== -1){
          this.updateJobPost(selectedQuestionOption);
        }
        this.navigateToNextQuestion(selectedQuestionOption.NextQuestionId);
      }
    }
    // For static components with OptionId -1 (job-title, describe, addphotos, etc.)
    else if(this.selectedOptionId === -1) {
      const staticComponentOption = this.questionOptions.find(qo =>
        qo.TradePersonJobId == this.selectedJobId &&
        qo.OptionId === -1 &&
        qo.QuestionId == this.questionId
      );

      console.log('Static Component Option:', staticComponentOption);
      if(staticComponentOption){
        this.navigateToNextQuestion(staticComponentOption.NextQuestionId);
      } else {
        console.warn('No navigation option found for static component. Question ID:', this.questionId);
      }
    }
    else {
      console.warn('No option selected. Please select an option before proceeding.');
    }
    console.log(this.jobPostService.JobPost);
  }

  navigateToNextQuestion(nextQuestionId: number | undefined) {
    if(nextQuestionId && nextQuestionId !== -1){
      console.log('Navigating to Question ID:', nextQuestionId);
      this.questionId = nextQuestionId;
      this.selectedOptionId = -1;
      
      if(this.questionId){
        this.setQuestionTitle(this.questionId);
        this.setQuestionOptions(this.questionId);
        this.setScreenType();            
        console.log('Screen Type:', this.screenType);
        this.setQuestionIndex();
        this.selectedOptionId = this.getPrevNextSelectedOptionId(this.questionId);
        this.forwardProgressValue();
      }
    } else {
      console.log('No next question available or last question reached.');
    }
  }

  getPreviousQuestionId(questionId: number){
    let previousQuestionId = -1;
    console.log(this.questionIds);
    const questionIdIndex = this.getQuestionIndex();
    if(questionIdIndex > 0){
      previousQuestionId = this.questionIds[questionIdIndex -1];
    }
    return previousQuestionId;
  }

  goToPreviousQuestion() {
    console.log(this.questionId);
    if(this.questionId){
      const previousQuestionId = this.getPreviousQuestionId(this.questionId);
      this.selectedOptionId = this.getPrevNextSelectedOptionId(previousQuestionId);
      console.log(previousQuestionId);
      if(previousQuestionId !== -1){
        this.questionId = previousQuestionId;
        if(this.questionId){
          this.setQuestionTitle(this.questionId);
          this.setQuestionOptions(this.questionId);
          this.setScreenType();
          this.setQuestionIndex();           
          console.log(this.selectedOptionId); 
          this.backwardProgressValue();  
        }
      }
    }
    console.log(this.jobPostService.JobPost);
  }

  setQuestionTitle(questionId: number){
    const question = this.questionsService.getQuestionTitle(questionId);
    if(question){
      this.questionTitle = question;
      this.questionTitle;
    }            
  }

  setQuestionOptions(questionId: number){
    const questionOptions = this.questionOptionsService.getQuestionOptions(questionId);
    console.log(questionOptions);
    this.options = [];
    questionOptions.forEach(qo => {
      const option = this.optionsService.getOption(qo.OptionId);
      if(option){
        this.options.push(option);
      }              
    });    
  }  

  getPrevNextSelectedOptionId(questionId: number){
    let prevNextSelectedOptionId = -1;
    const questionIdIndex = this.questionIds.findIndex(element => element ==questionId);
    console.log(questionIdIndex);
    if(questionIdIndex > -1){
      console.log(this.selectedOptionIds);
      prevNextSelectedOptionId = this.selectedOptionIds[questionIdIndex];
    }
    return prevNextSelectedOptionId;
  }

  closeQuiz() {
  }
}
