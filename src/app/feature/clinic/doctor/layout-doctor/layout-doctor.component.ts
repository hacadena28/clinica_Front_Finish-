import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {
  FormCreateAdminComponent
} from "../../../admin/admin-management/components/form-create-admin/form-create-admin.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {AgregarHistoriaClinicaComponent} from "../agregar-historia-clinica/agregar-historia-clinica.component";
import {NotificationService} from "../../../../shared/notification.service";

@Component({
  selector: 'app-layout-doctor',
  templateUrl: './layout-doctor.component.html',
  styleUrls: ['./layout-doctor.component.scss']
})
export class LayoutDoctorComponent {
  modalRef: MdbModalRef<AgregarHistoriaClinicaComponent> | null = null;
  router = inject(Router);

  constructor(private modalService: MdbModalService,    private notificationService: NotificationService,
  ) {
  }

  navigateHome() {
    this.router.navigate(['home'])
    localStorage.clear();
    this.notificationService.mostrarExito("Sesion cerrada correctamente")
  }

  openModal() {
    this.modalRef = this.modalService.open(AgregarHistoriaClinicaComponent, {
      modalClass: 'modal-lg',
    });
  }

}
