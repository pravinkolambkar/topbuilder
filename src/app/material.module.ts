import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton, MatButtonModule } from '@angular/material/button';


 @NgModule({
      declarations: [],
      imports: [
         MatCardModule,
         MatFormFieldModule,
         MatIconModule,
         MatSelectModule,
         MatOptionModule,
         MatDividerModule,
         MatButtonModule,
         MatCard,
         MatIcon, 
         MatInput,
         MatLabel,
         MatCardHeader, 
         MatCardTitle, 
         MatCardContent, 
         MatFormField,
         MatGridList, 
         MatGridTile,
         MatProgressBar,
         MatButton
   
      ],

      exports: [
         MatCardModule,
         MatFormFieldModule,
         MatIconModule,
         MatSelectModule,
         MatOptionModule,
         MatDividerModule,
         MatButtonModule,
         MatCard,
         MatIcon, 
         MatInput,
         MatLabel,
         MatCardHeader, 
         MatCardTitle, 
         MatCardContent, 
         MatFormField,
         MatGridList, 
         MatGridTile,
         MatProgressBar,
         MatButton
      ]
   })

    export class MaterialModule { }