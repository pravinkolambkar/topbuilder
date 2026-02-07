import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PopularJobs } from '../models/popularjobs.model';
import  popularjobsData from '../../../assets/JsonFiles/PopularJobs.json';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-jobs',
  imports: [ MaterialModule, CommonModule ],
  templateUrl: './popular-jobs.component.html',
  styleUrls: ['./popular-jobs.component.css']
})
export class PopularJobsComponent implements OnInit{

  selectedTradepersonId: number | any;
  selectedJobId: number | any;
  startQuestionId: number | undefined;
  pjobs: PopularJobs[] = [];

  constructor(private router: Router) {} 

  ngOnInit(): void {
    this.pjobs = popularjobsData;
  }

  onCardClick() {
    this.router.navigate(['/post-a-job', 2, 4, 1]);
  }
}
