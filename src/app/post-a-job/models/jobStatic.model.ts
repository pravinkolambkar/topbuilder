export interface IJobStatic {
    Id: number;
    Title: string,
    Description: string,
    ImagePath: String;
    Budget: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Mobile: string;
    PostCode: string;    
  }
  
  export class JobStatic implements IJobStatic {
    public Id: number;
    public Title: string;
    public Description: string;
    public ImagePath: String;  
    public Budget: string;  
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Mobile: string;   
    public PostCode: string;
          
    constructor(id: number, title: string, description: string, imagePath: string, budget:string,
      firstName: string, lastName: string, email: string, mobile: string, postCode: string) {
      this.Id = id;
      this.Title = title;
      this.Description = description;
      this.ImagePath = imagePath;
      this.Budget = budget;
      this.FirstName = firstName;
      this.LastName = lastName;
      this.Email = email;
      this.Mobile = mobile;
      this.PostCode = postCode;
    }
  }