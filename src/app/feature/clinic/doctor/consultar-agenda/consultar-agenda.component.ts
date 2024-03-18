import {Component, inject, OnInit} from '@angular/core';
import {AppointmentService} from "../../patient/shared/services/appointment.service";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ChangeInfoAppointment} from "../../patient/shared/services/chage-info-appointment.service";
import {ReagendarCitaComponent} from "../../patient/reagendar-cita/reagendar-cita.component";
import {CancelarCitaComponent} from "../../patient/cancelar-cita/cancelar-cita.component";
import {AppointmentDTO} from "../../patient/shared/interfaces/appointment";
import {DatePipe} from "@angular/common";
import {AgregarHistoriaClinicaComponent} from "../agregar-historia-clinica/agregar-historia-clinica.component";

@Component({
  selector: 'app-consultar-agenda',
  templateUrl: './consultar-agenda.component.html',
  styleUrls: ['./consultar-agenda.component.scss']
})
export class ConsultarAgendaComponent implements OnInit{
  constructor(
    protected aS: AppointmentService,
    protected modalService: MdbModalService,
    private changeInfoEpsAppointment :ChangeInfoAppointment,
    private datePipe : DatePipe
  ) {
    this.changeInfoEpsAppointment.evento.subscribe((data) => {
      this.getData();
    });
  }
  modalRefReagendarCita: MdbModalRef<AgregarHistoriaClinicaComponent> | null = null;
  modalRefCancelarCita: MdbModalRef<CancelarCitaComponent> | null = null;
  data: AppointmentDTO[] = [];
  stateMap: any = {
    'Scheduled': 'Programada',
    'Rescheduled': 'Reprogramada',
    'Canceled': 'Cancelada',
    'Attended': 'Atendida'
  };

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    this.aS.getByDoctorAndDate(date).subscribe(response => {
      this.data = response;
    });
  }

  getStateName(value: string): string {
    return this.stateMap[value] || value;
  }

  showReagendarButton(state: string): boolean {
    return state === 'Scheduled' || state === 'Rescheduled';
  }

  showCancelarButton(state: string): boolean {
    return state === 'Scheduled' || state === 'Rescheduled';
  }

  openModalReagendar(appointment: AppointmentDTO) {
    this.modalRefReagendarCita = this.modalService.open(AgregarHistoriaClinicaComponent, {
      modalClass: 'modal-xs',
      data: appointment,
    });
    if (this.modalRefReagendarCita) {
      this.modalRefReagendarCita.component.data = appointment;
    }
  }
  openModalCancelar(appointment: AppointmentDTO) {
    this.modalRefCancelarCita = this.modalService.open(CancelarCitaComponent, {
      modalClass: 'modal-xs',
      data: appointment,
    });
    if (this.modalRefCancelarCita) {
      this.modalRefCancelarCita.component.appointment = appointment;
    }
  }
}
