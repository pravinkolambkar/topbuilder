import { JobPostQuestionOption } from "./jobPostQuestionOption.model";
import { JobStatic } from "./jobStatic.model";

export interface IJobPost {
    Id: number;
    UserId: number;
    PostedDate: Date;
    QuestionOptions: JobPostQuestionOption[];
    JobStatic: JobStatic| undefined;    
  }
  
  export class JobPost implements IJobPost {
    public Id: number;
    public UserId: number;
    public PostedDate: Date;
    QuestionOptions: JobPostQuestionOption[] = [];   
    JobStatic: JobStatic | undefined;
          
    constructor(id: number, userId: number, postedDate: Date) {
      this.Id = id;
      this.UserId = userId;
      this.PostedDate = postedDate;
    }
  }