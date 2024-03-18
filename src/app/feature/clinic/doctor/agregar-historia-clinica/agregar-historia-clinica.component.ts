import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppointmentDTO} from "../../patient/shared/interfaces/appointment";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {ChangeInfoAppointment} from "../../patient/shared/services/chage-info-appointment.service";
import {AppointmentService} from "../../patient/shared/services/appointment.service";
import {DatePipe} from "@angular/common";
import {ChangeInfoMedicalHistoryService} from "../shared/services/change-info-medical-history.service";
import {NotificationService} from "../../../../shared/notification.service";
import {DiseaseService} from "../../../admin/disease-management/shared/service/disease.service";
import {DiseaseDto} from "../../../admin/disease-management/shared/models/disease-dto.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-agregar-historia-clinica',
  templateUrl: './agregar-historia-clinica.component.html',
  styleUrls: ['./agregar-historia-clinica.component.scss']
})
export class AgregarHistoriaClinicaComponent implements OnInit {
  @Input() id!: number;
  @Input() data!: AppointmentDTO;
  formulario: FormGroup;
  enfermedades: DiseaseDto[] = [];
  listaEnfermedades: string[] = [];

  constructor(
    public modalRef: MdbModalRef<AgregarHistoriaClinicaComponent>,
    private notificationService: NotificationService,
    private changeInfoMedicalHistory: ChangeInfoMedicalHistoryService,
    private changeInfoAppointment: ChangeInfoAppointment,
    private fb: FormBuilder,
    private diseaseServices: DiseaseService,
    private appointmentService: AppointmentService
  ) {

    this.formulario = this.fb.group({
      description: ['', Validators.required],
      diagnosis: [[], Validators.required],
      treatment: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.diseaseServices.getAll().subscribe(response => {
      this.enfermedades = response;
      console.log(response);
    });
  }

  cerrar() {
    this.modalRef.close(false);
  }

  agregarHistoria() {
    if (this.formulario.valid) {
      this.appointmentService.reagendarCita({
        id: this.data.id,
        state: "Attended",
        newDate: this.data.appointmentStartDate
      }).subscribe((result) => {
        this.changeInfoAppointment.emitirEvento("CHAGE_DATA");
        this.modalRef.close(true);
        this.agregarHistoriaClinica();
      }, error => {
        console.log(error.error.message)
        this.notificationService.mostrarError("Por favor ajuste la fecha, debido a que debe ser horario de oficina");

      })
    } else {
      this.notificationService.mostrarError("llene todos los campos del formulario");

    }
  }

  agregarEnfermedad() {
    const nuevaEnfermedad = this.formulario.get('diagnosis')?.value;
    console.log("##"+nuevaEnfermedad)
    if (!this.listaEnfermedades.includes(nuevaEnfermedad)) {
      this.listaEnfermedades.push(nuevaEnfermedad);
    }
    console.log(nuevaEnfermedad);
    console.log(this.listaEnfermedades)
  }


  agregarHistoriaClinica() {
    debugger
    let data = {
      date: new Date(),
      description: this.formulario.value.description,
      diagnosis: this.listaEnfermedades,
      treatment: this.formulario.value.treatment,
      patiendId: this.data.patientId,
    }
    this.appointmentService.agregarHistoriaClinica(data).subscribe((result) => {
      this.changeInfoAppointment.emitirEvento("CHAGE_DATA");
      this.notificationService.mostrarExito("Historia agregada exitosamente");

    }, error => {
      console.log("agregar historial")
      console.log(error.error.message)
      this.notificationService.mostrarError("Error al registrar historia");
    })
  }


}
