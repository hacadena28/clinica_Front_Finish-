import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../admin/doctor-management/shared/Services/user.service";
import {NotificationService} from "../../../shared/notification.service";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private notificationService: NotificationService) {
    this.builderForms();
  }

  CancelarRegistro() {
    this.router.navigate(["auth/login"])
  }

  builderForms() {
    this.formulario = this.formBuilder.group({
      documentNumber: ['', Validators.required]
    });
  }

  recuperarContrasena() {
    let {documentNumber} = this.formulario.value;
    this.userService.recoveryPassword(documentNumber).subscribe(() => {
      this.notificationService.mostrarExito("Contraseña enviada al correo electronico");
    }, () => {
      this.notificationService.mostrarError("Error verifique sus numero de documento");
    });

  }
}


