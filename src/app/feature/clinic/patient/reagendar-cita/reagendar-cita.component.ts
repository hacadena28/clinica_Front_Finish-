import {Component, inject, Input, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AppointmentDTO} from "../shared/interfaces/appointment";
import {AppointmentService} from "../shared/services/appointment.service";
import {ChangeInfoAppointment} from "../shared/services/chage-info-appointment.service";
import {NotificationService} from "../../../../shared/notification.service";

@Component({
  selector: 'app-reagendar-cita',
  templateUrl: './reagendar-cita.component.html',
  styleUrls: ['./reagendar-cita.component.scss']
})
export class ReagendarCitaComponent implements OnInit {
  @Input() appointment!: AppointmentDTO;

  constructor(public modalRef: MdbModalRef<ReagendarCitaComponent>, private notificationService: NotificationService, private changeInfoAppointment: ChangeInfoAppointment) {

  }

  formBuilder = inject(FormBuilder);
  appointmentService = inject(AppointmentService);
  formulario!: FormGroup;
  datePipe = inject(DatePipe);

  hours = [
    {value: '08', name: "08 AM"},
    {value: '09', name: "09 AM"},
    {value: '10', name: "10 AM"},
    {value: '11', name: "11 AM"},
    {value: '12', name: "12 AM"},
    {value: '14', name: "02 PM"},
    {value: '15', name: "03 PM"},
    {value: '16', name: "04 PM"},
    {value: '17', name: "05 PM"},
    {value: '18', name: "06 PM"}];
  minutes = ['00', '30'];

  ngOnInit(): void {
    this.builderForm();
  }

  builderForm() {
    this.formulario = this.formBuilder.group({
      date: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required],
    });
  }

  cerrar() {
    this.modalRef.close(false);
  }

  validateForm(): boolean {
    const form = this.formulario;
    for (const i in form.controls) {
      if (form.controls.hasOwnProperty(i)) {
        form.controls[i].markAsTouched();
        form.controls[i].updateValueAndValidity();
      }
    }
    return form.valid;
  }

  reagendarCita() {
    if (this.formulario) {
      const date = this.formulario.get('date')!.value;
      const hour = this.formulario.get('hour')!.value;
      const minute = this.formulario.get('minute')!.value;
      const datePipe = new DatePipe('es');
      const formattedDate = datePipe.transform(date, 'yyyy-MM-dd'); // Formatear la fecha

      const appointmentStartDate = `${formattedDate}T${hour}:${minute}:00`;

      if (this.formulario.value.appointmentStartDate < this.appointment.appointmentStartDate) {
        this.notificationService.mostrarError("La fecha seleccionada no puede ser menor a la actual")
        return;
      }

      this.appointmentService.reagendarCita({
        id: this.appointment.id,
        state: "Rescheduled",
        newDate: appointmentStartDate
      }).subscribe((result) => {
        this.changeInfoAppointment.emitirEvento("CHAGE_DATA");
        this.notificationService.mostrarExito(`La cita fue reagendada correctamente ${appointmentStartDate}`)
        this.modalRef.close(true);
      }, error => {

        if (error.error.message == "Fecha no disponible") {
          this.notificationService.mostrarInfo(error.error.message)
        } else {

          this.notificationService.mostrarError(
            "No se puede reagendar una cita ya reagendada"
          );
        }
      })
    }
  }
}
