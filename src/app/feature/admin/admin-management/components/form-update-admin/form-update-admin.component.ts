import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AdminService} from "../../shared/Services/admin.service";
import {ChangeInfoAdminService} from "../../shared/Services/change-info-admin.service";
import {NotificationService} from "../../../../../shared/notification.service";

@Component({
  selector: 'app-form-update-admin',
  templateUrl: './form-update-admin.component.html',
  styleUrls: ['./form-update-admin.component.scss']
})
export class FormUpdateAdminComponent implements OnInit {
  @Input() data: any;
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<FormUpdateAdminComponent>,
    private changeInfoAdminService: ChangeInfoAdminService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.builderForms();
  }

  builderForms() {
    this.formulario = this.formBuilder.group({
      firstName: [this.data?.firstName || '', [Validators.required, Validators.maxLength(50)]],
      secondName: [this.data?.secondName || '', [Validators.required, Validators.maxLength(50)]],
      lastName: [this.data?.lastName || '', [Validators.required, Validators.maxLength(50)]],
      secondLastName: [this.data?.secondLastName || '', [Validators.required, Validators.maxLength(50)]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || '', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(15)]],// Ajustar el rango según el formato deseado
      address: [this.data?.address || '', [Validators.required, Validators.maxLength(100)]],
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

  updateAdmin() {
    if (this.formulario.valid) {

      const adminUpdate = {

        id: this.data.id,
        firstName: this.formulario.value.firstName,
        secondName: this.formulario.value.secondName,
        lastName: this.formulario.value.lastName,
        secondLastName: this.formulario.value.secondLastName,
        email: this.formulario.value.email,
        phone: this.formulario.value.phone.toString(),
        address: this.formulario.value.address
      }

      this.adminService.put(this.data.id, adminUpdate).subscribe(
        (result) => {
          this.changeInfoAdminService.emitirEvento("RECARGA_DATA");
          this.close();
          this.notificationService.mostrarExito("Admin actualizada con exito");
          alert('');
        },
        () => {
          this.notificationService.mostrarError("No se pudo actualizar la Admin, contacta al administrador");

        }
      );
    }
  }
}
