import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Questions } from '../models/questions.model';
import { Options } from '../models/options.model';
import { QuestionOption } from '../models/questionoption.model';


@Injectable({
  	providedIn: 'root',
})
export class OptionsService implements OnInit {
    options: Options[] = [];    
    private optionsUrl = '../../assets/JsonFiles/Options.json';

  	constructor(private http: HttpClient) {}

  	ngOnInit(): void {}

 	getOptions() {
        this.http.get<any>(this.optionsUrl).subscribe(data => {
            this.options = data;
        });     
    }

    getOption(id: number){
        return this.options.find(o => o.Id == id);
    }
}
