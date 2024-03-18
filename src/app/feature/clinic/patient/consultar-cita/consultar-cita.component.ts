import {Component, inject, OnInit} from '@angular/core';
import {AppointmentDTO} from '../shared/interfaces/appointment';
import {AppointmentService} from '../shared/services/appointment.service';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ReagendarCitaComponent} from "../reagendar-cita/reagendar-cita.component";
import {ChangeInfoAppointment} from "../shared/services/chage-info-appointment.service";
import {CancelarCitaComponent} from "../cancelar-cita/cancelar-cita.component";

@Component({
  selector: 'app-consultar-cita',
  templateUrl: './consultar-cita.component.html',
  styleUrls: ['./consultar-cita.component.scss']
})
export class ConsultarCitaComponent implements OnInit {
  constructor(
    protected aS: AppointmentService,
    protected modalService: MdbModalService,
    private changeInfoEpsAppointment: ChangeInfoAppointment
  ) {
    this.changeInfoEpsAppointment.evento.subscribe((data) => {
      this.getData(this.page);
    });
  }

  modalRefReagendarCita: MdbModalRef<ReagendarCitaComponent> | null = null;
  modalRefCancelarCita: MdbModalRef<CancelarCitaComponent> | null = null;
  data: AppointmentDTO[] = [];
  page = 1;
  total = 0;
  perPage = 5;
  totalRecords = 0;
  stateMap: any = {
    'Scheduled': 'Programada',
    'Rescheduled': 'Reprogramada',
    'Canceled': 'Cancelada',
    'Attended': 'Atendida'
  };

  ngOnInit(): void {
    this.getData(this.page);
  }

  getData(page: number = 1) {
    this.aS.getAllPaginated(page, 5).subscribe(response => {
      this.data = response.records;
      this.total = response.totalRecords;
      console.log(response);
    });
  }

  pageChanged(page: number) {
    this.page = page;
    this.getData(this.page);
  }

  getStateName(value: string): string {
    return this.stateMap[value] || value;
  }

  showReagendarButton(state: string): boolean {
    return state === 'Scheduled';
  }

  showCancelarButton(state: string): boolean {
    return state === 'Scheduled' || state === 'Rescheduled';
  }

  openModalReagendar(appointment: AppointmentDTO) {
    this.modalRefReagendarCita = this.modalService.open(ReagendarCitaComponent, {
      modalClass: 'modal-xs',
      data: appointment,
    });
    if (this.modalRefReagendarCita) {
      this.modalRefReagendarCita.component.appointment = appointment;
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

  verInformacionCita(id: string) {

  }
}
