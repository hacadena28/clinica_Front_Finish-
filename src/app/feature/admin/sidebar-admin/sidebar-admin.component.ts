import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent {
  constructor(private router: Router) { }

  redirectToEps(): void {
    this.router.navigate(['admin/eps']);
  }
  redirectToDisease(): void {
    this.router.navigate(['admin/disease']);
  }

  redirectToDoctor(): void {
    this.router.navigate(['admin/doctor']);
  }

  redirectToPatient(): void {
    this.router.navigate(['admin/patient']);
  }
  redirectToAdmin(): void {
    this.router.navigate(['admin/admin']);
  }
  redirectToDashboard(): void {
    this.router.navigate(['admin/dashboard']);
  }



}
