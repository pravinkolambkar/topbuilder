import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TradepersonPagesComponent } from './home/tradeperson-pages/tradeperson-pages.component';
import { PostJobComponent } from './post-a-job/post-a-job.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
     { path: 'login', component: LogInComponent },
     { path: 'signup', component: SignUpComponent },
     { path: 'tradeperson-pages/:selectedServiceId', component: TradepersonPagesComponent },
     { path: 'post-a-job/:selectedTradepersonId/:selectedJobId/:startQuestionId', component: PostJobComponent }
];