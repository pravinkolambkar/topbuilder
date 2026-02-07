import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JobPost } from '../models/jobPost.model';
import { JobPostQuestionOption } from '../models/jobPostQuestionOption.model';
import { JobtitleComponent } from '../screen/static/job-title.component';
import { JobStatic } from '../models/jobStatic.model';

@Injectable({
    providedIn: 'root',
})
export class JobPostService implements OnInit {
    JobPost: JobPost;

    constructor(){
        this.JobPost = new JobPost(-1, -1, new Date());
        this.JobPost.JobStatic = new JobStatic(-1, "", "", "", "", "", "", "", "", "");
    }

    ngOnInit(): void {        
    }
    
    setJobPostUser(userId: number){ 
        this.JobPost.Id = -1;       
        this.JobPost.UserId = userId;
        this.JobPost.PostedDate = new Date();
    }
    
    updateQuestionOption(jobPostQuestionOption: JobPostQuestionOption){
        const jquestionOption = this.JobPost.QuestionOptions.find(qo => qo.QuestionOption.QuestionId == jobPostQuestionOption.QuestionOption.QuestionId);
        if(jquestionOption){
            jquestionOption.QuestionOption = jobPostQuestionOption.QuestionOption;
            jquestionOption.QuestionOptionId = jobPostQuestionOption.QuestionOption.Id;
        } else {
            this.JobPost.QuestionOptions.push(jobPostQuestionOption);
        }
        console.log(this.JobPost);
    }

    setJobTitle(jobTitle: string){
        if(this.JobPost.JobStatic){
            this.JobPost.JobStatic.Title =jobTitle;
        }        
    }

    setJobDescription(jobDescription: string){
        if(this.JobPost.JobStatic){
            this.JobPost.JobStatic.Description =jobDescription;
        }        
    }

    setJobBudget(jobBudget: string){
        if(this.JobPost.JobStatic){
            this.JobPost.JobStatic.Budget =jobBudget;
        }
    }

    setJobContactDetails(firstName: string, lastName: string, email: string, mobile: string){
        if(this.JobPost.JobStatic){
            this.JobPost.JobStatic.FirstName = firstName;
            this.JobPost.JobStatic.LastName = lastName;
            this.JobPost.JobStatic.Email = email;
            this.JobPost.JobStatic.Mobile = mobile;
        }
    }

    setJobPostCode(jobPostCode: string){
        if(this.JobPost.JobStatic){
            this.JobPost.JobStatic.PostCode =jobPostCode;
        }
    }

}