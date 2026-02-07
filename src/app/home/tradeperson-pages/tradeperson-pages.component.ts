import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TradepersonPages } from '../models/tradepersonpages.model'; 
import  tradepersonpagesData from '../../../assets/JsonFiles/TradepersonPages.json';
import { TradepersonPagesService } from '../services/tradeperson-pages.service';
import { MaterialModule } from 'src/app/material.module';
import { FindTradePersonComponent } from '../our-services/find-tradeperson/find-tradeperson.component';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-tradeperson-pages',
  imports: [ MaterialModule, FindTradePersonComponent, NgIf],
  templateUrl: './tradeperson-pages.component.html',
  styleUrls: ['./tradeperson-pages.component.css']
})
export class TradepersonPagesComponent implements OnInit{

  selectedTpId: number | any;
  tppages: TradepersonPages[] = [];
  tppage: TradepersonPages | undefined;
  
  constructor(private route: ActivatedRoute, private tppagesService: TradepersonPagesService) {};

  ngOnInit() {
    const tpId = this.route.snapshot.paramMap.get('selectedServiceId');

      if(tpId !== null) {
        this.selectedTpId = +tpId;
        console.log(this.selectedTpId);
      }

      if(this.selectedTpId) {
          this.tppagesService.gettpPageById(this.selectedTpId).subscribe(data => {
            this.tppage = data;
        });
      }

      
    //this.tppages = tradepersonpagesData;    
  };
}
