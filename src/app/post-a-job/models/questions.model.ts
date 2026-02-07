
export interface Questions {
  Id: number;
  Title: string;
}

export class Questions {
  public Id: number;
  public Title: string;

  constructor(Id: number, Title: string) {
    this.Id = Id;
    this.Title = Title;
  }
}
