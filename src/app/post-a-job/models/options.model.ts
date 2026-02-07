
export interface Options {
    Id: number;
    Title: string;
  }
  
  export class Options {
    public Id: number;
    public Title: string;
  
    constructor(Id: number, Title: string) {
      this.Id = Id;
      this.Title = Title;
    }
  }