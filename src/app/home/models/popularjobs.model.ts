export interface PopularJobs {
  popularjobId: number,
  jobTitle: string,
  jobSubtitle: string,
  imgSrc: string
}

  export class PopularJobs {
    public popularjobId: number;
    public jobTitle: string;
    public jobSubtitle: string;
    public imgSrc: string;

    constructor(
      popularjobId: number,
      jobTitle: string,
      jobSubtitle: string,
      imgSrc: string
    ) {
        this.popularjobId = popularjobId;
        this.jobTitle = jobTitle;
        this.jobSubtitle = jobSubtitle;
        this.imgSrc = imgSrc;
    }
  }
  
