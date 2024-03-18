import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {NotificationService} from "../../../../../shared/notification.service";
import {DiseaseService} from "../../shared/service/disease.service";
import {ChangeInfoDiseaseService} from "../../shared/service/change-info-disease.service";

@Component({
  selector: 'app-form-update-disease',
  templateUrl: './form-update-disease.component.html',
  styleUrls: ['./form-update-disease.component.scss']
})
export class FormUpdateDiseaseComponent  implements OnInit {
  @Input() data: any;
  formulario!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private diseaseService: DiseaseService,
      public modalRef: MdbModalRef<FormUpdateDiseaseComponent>,
      private changeInfoDiseaseService: ChangeInfoDiseaseService,
      private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {

    this.builderForms();
  }

  builderForms() {

    this.formulario = this.formBuilder.group({
      name: [this.data?.name || '', Validators.required],
    });
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

  close(): void {
    console.log(this.data);
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  updateDisease() {

    if (this.formulario.valid) {
      this.diseaseService.put(this.data.id, this.formulario.value.name).subscribe(
          (result) => {
            this.changeInfoDiseaseService.emitirEvento("RECARGA_DATA");
            this.close();
            this.notificationService.mostrarExito("Enfermedad actualizada con exito");

          },
          () => {
            this.notificationService.mostrarError("No se pudo actualizar la Enfermedad, contacta al administrador");

          }
      );
    }
  }

}

