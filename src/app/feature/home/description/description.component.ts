import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {

  constructor(private router:Router) {

  }

  redirectLogin(){
    this.router.navigate(['/auth/login']);
  }

}
