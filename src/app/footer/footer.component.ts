import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(
		//private route: ActivatedRoute,
    private router:Router,
  ) { }

  signup() {
    this.router.navigateByUrl('/signup');
  }
}