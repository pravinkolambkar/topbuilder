export interface OurServices {
    serviceId : number,
    serviceName : string,
    imgSrc : string,
    routeUrl : string
}

export class OurServices {
    public serviceId : number;
    public serviceName : string;
    public imgSrc : string;
    public routeUrl : string;

    constructor(
        serviceId : number,
        serviceName : string,
        imgSrc : string,
        routeUrl : string    
    ) {
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.imgSrc = imgSrc;
        this.routeUrl = routeUrl;
    }
}