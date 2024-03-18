import {AdminService} from "../../shared/Services/admin.service";
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TypeDocument} from "../../../doctor-management/shared/enums/type-document";
import {Specialization} from "../../../doctor-management/shared/enums/specialization";
import {ChangeInfoAdminService} from "../../shared/Services/change-info-admin.service";
import {UserAdminService} from "../../shared/Services/user-admin.service";
import {EpsService} from "../../../eps-management/shared/service/eps.service";
import {EpsDto} from "../../../eps-management/shared/models/eps-dto.interface";
import {NotificationService} from "../../../../../shared/notification.service";

@Component({
  selector: 'app-form-create-admin',
  templateUrl: './form-create-admin.component.html',
  styleUrls: ['./form-create-admin.component.scss']
})
export class FormCreateAdminComponent implements OnInit{
  data: EpsDto[] = [];
  formulario!: FormGroup;
  documentTypes = Object.entries(TypeDocument).map(([key, value]) => ({key, value}));specialization = Object.values(Specialization);


  ngOnInit(): void {
    this.getEps();
  }


  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    protected epsService: EpsService,
    private userService: UserAdminService,
    public modalRef: MdbModalRef<FormCreateAdminComponent>,
    private changeInfoAdminService: ChangeInfoAdminService,
    private notificationService: NotificationService,
  ) {
    this.builderForms();
  }



  builderForms() {
    this.formulario = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      secondName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      secondLastName: ['', [Validators.required, Validators.maxLength(50)]],
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(15)]],// Ajustar el rango según el formato deseado
      address: ['', [Validators.required, Validators.maxLength(100)]],
      birthdate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],

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
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
  private getEps() {
    this.epsService.getAll().subscribe((data) => {
      this.data = data;
    })
  }

  registerAdmin() {
    if(this.formulario.value.password == this.formulario.value.confirmPassword){

    if (this.formulario.valid) {
      const adminRegistration = {
        password: this.formulario.value.password,
        admin: {
          firstName: this.formulario.value.firstName,
          secondName: this.formulario.value.secondName,
          lastName: this.formulario.value.lastName,
          secondLastName: this.formulario.value.secondLastName,
          documentType: this.formulario.value.documentType,
          documentNumber: this.formulario.value.documentNumber.toString(),
          email: this.formulario.value.email,
          phone: this.formulario.value.phone.toString(),
          address: this.formulario.value.address,
          birthdate: this.formulario.value.birthdate,
        }
      };
      this.userService.post(adminRegistration).subscribe(
        (result) => {
          this.changeInfoAdminService.emitirEvento("RECARGA_DATA");
          this.close();
          this.notificationService.mostrarExito("Admin creado exitosamente");
          this.close();
        },
        () => {
          this.notificationService.mostrarError("No se pudo crear el doctor, contacta al administrador");
          alert('');
        }
      );
    } else {
      this.notificationService.mostrarError("Por favor, completa correctamente todos los campos del formulario");
    }

    }
    else{
      this.notificationService.mostrarError("Las contraseñas deben coincidir")
    }
  }
}




