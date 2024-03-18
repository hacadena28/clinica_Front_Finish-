import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs";
import {AdminService} from "../../shared/Services/admin.service";
import {UserModelDto} from "../../../doctor-management/shared/models/user-dto.model";
import {AdminPaginatedDto} from "../../shared/models/admin-paginated-dto.model";
import {EpsService} from "../../../eps-management/shared/service/eps.service";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {
  FormUpdateDoctorComponent
} from "../../../doctor-management/components/form-update-doctor/form-update-doctor.component";
import {FormUpdateAdminComponent} from "../form-update-admin/form-update-admin.component";
import {ChangeInfoDoctorService} from "../../../doctor-management/shared/Services/change-info-doctor.service";
import {DoctorUpdate} from "../../../doctor-management/shared/models/doctor-update";
import {AdminUpdate} from "../../shared/models/admin-update";
import {ConfirmActionComponent} from "../../../../../shared/components/confirm-action/confirm-action.component";
import {UserAdminService} from "../../shared/Services/user-admin.service";
import {ChangeInfoAdminService} from "../../shared/Services/change-info-admin.service";
import {NotificationService} from "../../../../../shared/notification.service";

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.scss']
})
export class TableAdminComponent implements OnInit {
  modalRefUpdate: MdbModalRef<FormUpdateAdminComponent> | null = null;
  data: AdminPaginatedDto[] = [];
  page = 1;
  total = 0;
  perPage = 10;
  totalRecords = 0;

  constructor(public adminService: AdminService, public userAdminService: UserAdminService, private notificationService: NotificationService,     public epsService:EpsService,private changeInfoAdminService: ChangeInfoAdminService, private modalService: MdbModalService) {
    this.changeInfoAdminService.evento.subscribe((data) => {
      this.getData();
    });
  }

  ngOnInit() {
    this.getData(this.page);
  }

  getData(page: number = 1) {
    this.adminService.getAllPaginated(page, 5).subscribe(response => {
      this.data = response.records;
      this.total = response.totalRecords + 1;
    });
  }

  openModalUpdate(adminUpdate: AdminUpdate) {
    this.modalRefUpdate = this.modalService.open(FormUpdateAdminComponent, {
      modalClass: 'modal-lg',
      data: adminUpdate,
    });
    if (this.modalRefUpdate) {
      this.modalRefUpdate.component.data = adminUpdate;
    }
  }

  pageChanged(page: number) {
    this.page = page;
    this.getData(this.page);
  }

  abrirModalConfirmacion(documentNumber: string) {
    const modalRef: MdbModalRef<ConfirmActionComponent> = this.modalService.open(ConfirmActionComponent);
    modalRef.onClose.subscribe((result) => {
      if (result) {
        this.delete(documentNumber)
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }

  delete(documentNumber: string) {
    this.userAdminService.getByDocumentNumber(documentNumber).pipe(
      switchMap((userSearched: UserModelDto) => {
        return this.userAdminService.delete(userSearched.id);
      })
    ).subscribe(
      () => {
        this.notificationService.mostrarExito("Usuario eliminado correctamente");
        this.getData();
      },
      () => {
        this.notificationService.mostrarError("Fallo en eliminar, contacte con el administrador");

      }
    );
  }


}


