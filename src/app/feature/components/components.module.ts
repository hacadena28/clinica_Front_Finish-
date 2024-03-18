import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutPacienteComponent } from './layout-paciente/layout-paciente.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FooterComponent } from './footer/footer.component';
import { SidebarDoctorComponent } from './sidebar-doctor/sidebar-doctor.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutPacienteComponent,
    FooterComponent,
    SidebarDoctorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    GoogleMapsModule
  ],
  exports: [
    LayoutComponent,
    LayoutPacienteComponent,
    FooterComponent,
    SidebarComponent,
    SidebarDoctorComponent
  ]
})
export class ComponentsModule { }
