import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  images = [
    {path:'assets/img1.jpg'},
    {path:'assets/img2.jpg'},
    {path:'assets/img3.jpg'},
    {path:'assets/img4.jpg'},
    {path:'assets/img5.jpg'},
  ]
}
