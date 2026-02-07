export interface TradepersonJob {
    Id: number,
    Title: string,
    ParentId: number | null,
    StartQuestionId: number | null
  }

  export class TradepersonJob {
    public Id: number;
    public Title: string;
    public ParentId: number | null;
    public StartQuestionId: number | null;

    constructor(
        Id: number,
        Title: string,
        ParentId: number | null,
        StartQuestionId: number | null
    ) {
        this.Id = Id;
        this.Title = Title;
        this.ParentId = ParentId;
        this.StartQuestionId = StartQuestionId;
    }
  }
