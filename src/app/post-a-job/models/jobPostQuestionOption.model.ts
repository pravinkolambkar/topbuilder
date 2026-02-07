import { QuestionOption } from "./questionoption.model";

export interface IJobPostQuestionOption {
    Id: number;
    JobPostId: number;
    QuestionOptionId: number;    
    QuestionOption: QuestionOption;
  }
  
  export class JobPostQuestionOption implements IJobPostQuestionOption {
    public Id: number;
    public JobPostId: number;
    public QuestionOptionId: number;
    public QuestionOption: QuestionOption;

  
    constructor(id: number, jobPostId: number, questionOptionId: number, questionOption: QuestionOption) {
      this.Id = id;
      this.JobPostId = jobPostId;
      this.QuestionOptionId = questionOptionId;
      this.QuestionOption = questionOption;
    }
  }