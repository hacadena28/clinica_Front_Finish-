import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PagePatientComponent } from './page-patient/page-patient.component';
import { RegistrarCitaComponent } from './registrar-cita/registrar-cita.component';
import { ConsultarCitaComponent } from './consultar-cita/consultar-cita.component';
import {ComponentsModule} from "../../components/components.module";
import {NgxPaginationModule} from "ngx-pagination";
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from './shared/services/appointment.service';
import { MatIconModule } from '@angular/material/icon';
import { ReagendarCitaComponent } from './reagendar-cita/reagendar-cita.component';
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {CancelarCitaComponent} from "./cancelar-cita/cancelar-cita.component";
import {
  ConsultarMedicalHistoryComponent
} from "../doctor/consultar-medical-history/consultar-medical-history.component";
import {DoctorModule} from "../doctor/doctor.module";


@NgModule({
  declarations: [
    PagePatientComponent,
    RegistrarCitaComponent,
    ConsultarCitaComponent,
    ReagendarCitaComponent,
    CancelarCitaComponent,

  ],
  imports: [

    CommonModule,
    NgxPaginationModule,
    PatientRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatIconModule,
    MdbModalModule,
    DoctorModule
  ],
  providers: [
    DatePipe, AppointmentService
  ]
})
export class PatientModule { }
