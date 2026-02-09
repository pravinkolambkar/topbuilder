import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Questions } from '../models/questions.model';
import { Options } from '../models/options.model';
import { QuestionOption } from '../models/questionoption.model';


@Injectable({
    providedIn: 'root',
})
export class QuestionsService implements OnInit {
    questions: Questions[] = [];
    private questionsUrl = 'assets/JsonFiles/Questions.json';

  	constructor(private http: HttpClient) {}

  	ngOnInit(): void {}

 	getQuestions() {
        this.http.get<any>(this.questionsUrl).subscribe(data => {
            this.questions = data;
        });     
    }

    getQuestionTitle(questionId: number){
        return this.questions.find(q => q.Id == questionId)?.Title;
    }
}
