import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, CommonModule, FormsModule ],
  providers: [
    {
      provide: ActivatedRoute,
      useValue: {
        snapshot: { params: {} },
        params: of({}),
        queryParams: of({}),
        fragment: of(''),
        data: of({})
      }
    }
  ],
  
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  encapsulation!: ViewEncapsulation.ShadowDom
  
  isCollaspe: boolean = false;

  constructor(
    private router:Router, private route: ActivatedRoute
  ) { }

    ngOnInit(): void {
      
    }
  

  signup() {
    this.router.navigateByUrl('/signup');
  }
}
