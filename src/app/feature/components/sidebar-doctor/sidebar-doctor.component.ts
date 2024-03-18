import { Component } from '@angular/core';
import {Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-sidebar-doctor',
  templateUrl: './sidebar-doctor.component.html',
  styleUrls: ['./sidebar-doctor.component.scss']
})


export class SidebarDoctorComponent {

  constructor(private router: Router) {
  }

  redirectToAgenda(): void {
    console.log("navegando")
    this.router.navigate(['clinic/doctor/agenda']);
  }
  redirectToHistorial(): void {
    this.router.navigate(['clinic/doctor/historial-medico']);
  }
}


