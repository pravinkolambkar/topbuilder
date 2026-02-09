import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OurServices } from '../models/ourservices.model';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OurservicesService implements OnInit {    
    private ourServicesUrl = 'assets/JsonFiles/OurServices.json';

    constructor(private http: HttpClient) {}

  	ngOnInit(): void {}

        getServices(): Observable<OurServices[]> {
            return this.http.get<OurServices[]>(this.ourServicesUrl);
        }

        getServiceById(id: number): Observable<OurServices | undefined> {
        return this.getServices().pipe(
            map((services: OurServices[]) => services.find(service => service.serviceId === id))
        );
    }
}
