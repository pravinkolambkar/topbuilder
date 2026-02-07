

import { bootstrapApplication } from '@angular/platform-browser';
//import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
//import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers
    
  ]
}).catch(err => console.error(err));
