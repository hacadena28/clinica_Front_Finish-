import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EpsService} from "../../shared/service/eps.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {ChangeInfoEpsService} from "../../shared/service/chage-info-eps.service";
import {EpsDto} from "../../shared/models/eps-dto.interface";
import {data} from "autoprefixer";
import {NotificationService} from "../../../../../shared/notification.service";

@Component({
  selector: 'app-form-create-eps',
  templateUrl: './form-update-eps.component.html',
  styleUrls: ['./form-update-eps.component.scss']
})
export class FormUpdateEpsComponent implements OnInit {
  @Input() data: any;
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private epsService: EpsService,
    public modalRef: MdbModalRef<FormUpdateEpsComponent>,
    private changeInfoEpsService: ChangeInfoEpsService,
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

  updateEPS() {

    if (this.formulario.valid) {
      this.epsService.put(this.data.id, this.formulario.value.name).subscribe(
        (result) => {
          this.changeInfoEpsService.emitirEvento("RECARGA_DATA");
          this.close();
          this.notificationService.mostrarExito("EPS actualizada con exito");

        },
        () => {
          this.notificationService.mostrarError("No se pudo actualizar la EPS, contacta al administrador");

        }
      );
    }
  }

}
