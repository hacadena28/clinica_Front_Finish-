import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from "../../../shared/notification.service";

@Component({
  selector: 'app-layout-paciente',
  templateUrl: './layout-paciente.component.html',
  styleUrls: ['./layout-paciente.component.scss']
})
export class LayoutPacienteComponent {

  constructor(
    private notificationService: NotificationService,
  ) {
  }

  router = inject(Router);


  navigateRegister() {
    this.router.navigate(['clinic/patient/registrar-cita'])
  }

  navigateConsultarCitas() {
    this.router.navigate(['clinic/patient/consultar-citas'])
  }

  navigateLogin() {
    this.router.navigate(['auth/login'])
    localStorage.clear();
    this.notificationService.mostrarExito("Sesión cerrada correctamente");

  }

  showModal(state: boolean) {
  }

  state = true;
}
