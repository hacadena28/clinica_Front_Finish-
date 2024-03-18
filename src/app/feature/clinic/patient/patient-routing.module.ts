import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarCitaComponent } from './consultar-cita/consultar-cita.component';
import { RegistrarCitaComponent } from './registrar-cita/registrar-cita.component';
import { PagePatientComponent } from './page-patient/page-patient.component';
import {
  ConsultarMedicalHistoryComponent
} from "../doctor/consultar-medical-history/consultar-medical-history.component";

const routes: Routes = [
  {
    path: '',
    component: PagePatientComponent,
    children: [
      { path: '', redirectTo: 'consultar-citas', pathMatch: 'full' },
      { path: 'consultar-citas', component: ConsultarCitaComponent },
      { path: 'historial-clinico', component: ConsultarMedicalHistoryComponent },
      { path: 'registrar-cita', component: RegistrarCitaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
