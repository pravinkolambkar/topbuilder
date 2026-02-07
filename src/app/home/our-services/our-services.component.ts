import { Component,  ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OurServices } from '../models/ourservices.model';
import { OurservicesService } from '../services/ourservices.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-our-services',
  imports: [ RouterLink, NgFor],
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {  
  
  services: OurServices[] = [];
  selectedServiceId: number | any;
  //@ViewChild('serId') serId : ElementRef | undefined;

  constructor(private router: Router, private ourservice: OurservicesService) {} 

    ngOnInit() {
      this.ourservice.getServices().subscribe(data => {
        this.services = data;
      });
    }

    // ngAfterViewInit() {
    //   this.serId.nativeElement.id = 'newId';
    // }

   onClick(id: number) {
    this.router.navigate(['/tradeperson-pages',id]);
  }
}
