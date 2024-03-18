import {PatientService} from "../../shared/Services/patient.service";
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TypeDocument} from "../../../doctor-management/shared/enums/type-document";
import {Specialization} from "../../../doctor-management/shared/enums/specialization";
import {ChangeInfoPatientService} from "../../shared/Services/change-info-patient.service";
import {UserPatientService} from "../../shared/Services/user-patient.service";
import {EpsService} from "../../../eps-management/shared/service/eps.service";
import {EpsDto} from "../../../eps-management/shared/models/eps-dto.interface";
import {NotificationService} from "../../../../../shared/notification.service";

@Component({
  selector: 'app-form-create-patient',
  templateUrl: './form-create-patient.component.html',
  styleUrls: ['./form-create-patient.component.scss']
})
export class FormCreatePatientComponent implements OnInit {
  data: EpsDto[] = [];
  formulario!: FormGroup;
  documentTypes = Object.entries(TypeDocument).map(([key, value]) => ({key, value}));
  specialization = Object.values(Specialization);


  ngOnInit(): void {
    this.getEps();
  }


  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    protected epsService: EpsService,
    private userService: UserPatientService,
    public modalRef: MdbModalRef<FormCreatePatientComponent>,
    private changeInfoPatientService: ChangeInfoPatientService,
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
      eps: ['', Validators.required],
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

  registerPatient() {
    if(this.formulario.value.password == this.formulario.value.confirmPassword){


      if (this.formulario.valid) {
      const patientRegistration = {
        password: this.formulario.value.password,
        patient: {
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
          eps: this.formulario.value.eps
        }
      };
      this.userService.post(patientRegistration).subscribe(
        (result) => {
          this.changeInfoPatientService.emitirEvento("RECARGA_DATA");
          this.close();
          this.notificationService.mostrarExito("Patient creado exitosamente");

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




