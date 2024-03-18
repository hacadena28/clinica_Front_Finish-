import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {DoctorService} from "../../shared/Services/doctor.service";
import {TypeDocument} from "../../shared/enums/type-document";
import {Specialization} from "../../shared/enums/specialization";
import {UserService} from "../../shared/Services/user.service";
import {ChangeInfoDoctorService} from '../../shared/Services/change-info-doctor.service';
import {NotificationService} from "../../../../../shared/notification.service";

@Component({
  selector: 'app-form-create-doctor',
  templateUrl: './form-create-doctor.component.html',
  styleUrls: ['./form-create-doctor.component.scss']
})
export class FormCreateDoctorComponent {
  formulario!: FormGroup;
  documentTypes = Object.entries(TypeDocument).map(([key, value]) => ({key, value}));
  specialization = Object.values(Specialization);

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private userService: UserService,
    public modalRef: MdbModalRef<FormCreateDoctorComponent>,
    private changeInfoDoctorService: ChangeInfoDoctorService,
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
      specialization: ['', Validators.required],
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

  registerDoctor() {
    if(this.formulario.value.password == this.formulario.value.confirmPassword){


    if (this.formulario.valid) {
      const doctorRegistration = {
        password: this.formulario.value.password,
        doctor: {
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
          specialization: this.formulario.value.specialization
        }
      };
      this.userService.post(doctorRegistration).subscribe(
        (result) => {
          this.changeInfoDoctorService.emitirEvento("RECARGA_DATA");
          this.close();
          this.notificationService.mostrarExito("Doctor creado exitosamente");
          alert('');
          this.close(); // Cerrar el modal después de la creación exitosa del doctor
        },
        () => {
          this.notificationService.mostrarError("No se pudo crear el doctor, contacta al administrador");
        }
      );
    } else {
      this.notificationService.mostrarError("Por favor, completa correctamente todos los campos del formulario");
    }
    }else{
      this.notificationService.mostrarError("Las contraseñas deben coincidir");

    }
  }
}
