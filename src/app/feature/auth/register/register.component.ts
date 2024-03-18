import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CreateUserPatient} from "../shared/models/create-patient.interface";
import {CreatePatientService} from "../shared/service/patient.service";
import {EpsDto} from "../../admin/eps-management/shared/models/eps-dto.interface";
import {EpsService} from "../../admin/eps-management/shared/service/eps.service";
import {TypeDocument} from "../../admin/doctor-management/shared/enums/type-document";
import {Specialization} from "../../admin/doctor-management/shared/enums/specialization";
import {NotificationService} from "../../../shared/notification.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data: EpsDto[] = [];
  formulario!: FormGroup;
  documentTypes = Object.entries(TypeDocument).map(([key, value]) => ({key, value}));

  constructor(
    protected createPatientService: CreatePatientService,
    protected epsService: EpsService,
    private formBuilder: FormBuilder,
    private navegador: Router,
    private notificationService: NotificationService,
  ) {
    this.builderForms();

  }

  ngOnInit(): void {
    this.getEps();


  }

  private getEps() {
    this.epsService.getAll().subscribe((data) => {
      this.data = data;
    })
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
      epesId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],

    });
  }


  campoTieneError(campo: string): boolean {
    const control = this.formulario?.get(campo);
    return (control != undefined) ? control.invalid && (control?.touched || control.dirty) : false;
  }

  registerPatient() {

if(this.formulario.value.password == this.formulario.value.confirmPassword){

    if (this.formulario.valid) {
      const createUserPatient: CreateUserPatient = {
        password: this.formulario.value.password,
        patient: {
          firstName: this.formulario.value.firstName,
          secondName: this.formulario.value.secondName,
          lastName: this.formulario.value.lastName,
          secondLastName: this.formulario.value.secondLastName,
          documentType: "IdentificationCard",
          documentNumber: this.formulario.value.documentNumber,
          email: this.formulario.value.email,
          phone: this.formulario.value.phone,
          address: this.formulario.value.address,
          birthdate: this.formulario.value.birthdate,
          epsId: this.formulario.value.epesId
        }
      }

      this.createPatientService.create(createUserPatient).subscribe((result) => {
        this.notificationService.mostrarExito("Paciente creado existosamente");
        this.navegador.navigate(["auth/login"])

      }, () => {
        this.notificationService.mostrarError("No se pudo crear el paciente, contacte con el administrador");


      });
    }
}else{
  this.notificationService.mostrarError("La contraseña debe coincidir");
}

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

  CancelarRegistro() {
    this.navegador.navigate(["auth/login"])
  }
}
