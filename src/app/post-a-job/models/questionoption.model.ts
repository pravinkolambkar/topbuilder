
export interface QuestionOption {
    Id: number;
    TradePersonJobId: number;
    QuestionId: number;
    OptionId: number;
    NextQuestionId: number;
  }
  
  export class QuestionOption {
    public Id: number;
    public TradePersonJobId: number;
    public QuestionId: number;
    public OptionId: number;
    public NextQuestionId: number;
  
    constructor(Id: number, TradePersonJobId: number, QuestionId: number, OptionId: number, NextQuestionId: number) {
      this.Id = Id;
      this.TradePersonJobId = TradePersonJobId;
      this.QuestionId = QuestionId;
      this.OptionId = OptionId;
      this.NextQuestionId = NextQuestionId;
    }
  }
  