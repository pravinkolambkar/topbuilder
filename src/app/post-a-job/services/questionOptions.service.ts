import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { QuestionOption } from '../models/questionoption.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuestionOptionsService implements OnInit {    
    private questionOptionsUrl = '../../assets/JsonFiles/QuestionOptions.json';
    private questionOptionsData: QuestionOption[] = [];
    questionOptions =new Subject<QuestionOption[]>();

    constructor(private http: HttpClient) {}

  	ngOnInit(): void {}

    setQuestionOptions(tradePersonJobId: number){
        this.http.get<any>(this.questionOptionsUrl).subscribe(data => {
            console.log(data);
            this.questionOptionsData = data;
            this.questionOptions.next(this.questionOptionsData);
        });
    }

    getQuestionOptions(questionId: number){
        return this.questionOptionsData.filter(qo => qo.QuestionId == questionId);
    }
}