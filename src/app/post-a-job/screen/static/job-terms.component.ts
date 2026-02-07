import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-job-terms',
  templateUrl: './job-terms.component.html',
  styleUrls: ['./job-terms.component.css']
})
export class JobTermsComponent implements AfterViewInit {
    @Output() optionChanged = new EventEmitter<number>();
  
    ngAfterViewInit(){
        console.log("emit from jobterms");
      this.optionChanged.emit(-1);
    }
}
