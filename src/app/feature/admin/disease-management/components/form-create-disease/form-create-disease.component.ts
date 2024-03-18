import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {NotificationService} from "../../../../../shared/notification.service";
import {DiseaseService} from "../../shared/service/disease.service";
import {ChangeInfoDiseaseService} from "../../shared/service/change-info-disease.service";

@Component({
  selector: 'app-form-create-disease',
  templateUrl: './form-create-disease.component.html',
  styleUrls: ['./form-create-disease.component.scss']
})
export class FormCreateDiseaseComponent {
  formulario!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private diseaseService: DiseaseService,
      public modalRef: MdbModalRef<FormCreateDiseaseComponent>,
      private changeInfoDiseaseService: ChangeInfoDiseaseService,
      private notificationService: NotificationService,
  ) {
    this.builderForms();
  }

  builderForms() {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
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

  mostrar: boolean = false;

  mostrarAlerta() {
    this.mostrar = !this.mostrar;
  }

  registerDisease() {
    if (this.formulario.valid) {
      this.diseaseService.post(this.formulario.value.name).subscribe(
          (result) => {
            this.changeInfoDiseaseService.emitirEvento("RECARGA_DATA");
            this.close();
            this.notificationService.mostrarExito('Enfermedad creada exitosamente')
          },
          () => {

            this.notificationService.mostrarError('No se pudo crear la Enfermedad, contacta al administrador')
          }
      );
    }
  }
}
