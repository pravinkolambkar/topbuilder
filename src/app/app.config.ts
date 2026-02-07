import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom, NO_ERRORS_SCHEMA, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Assuming you have a routes file
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, NgForm } from '@angular/forms';

export const appConfig: ApplicationConfig = {
   
   providers: [provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideAnimations(),
    importProvidersFrom(FormsModule, NgForm)
  ]
 };