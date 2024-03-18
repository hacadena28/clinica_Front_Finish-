import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'patient', loadChildren:() => import('./patient/patient.module').then(m => m.PatientModule) },
  { path: 'doctor', loadChildren:() => import('./doctor/doctor.module').then(m => m.DoctorModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ClinicModule { }
