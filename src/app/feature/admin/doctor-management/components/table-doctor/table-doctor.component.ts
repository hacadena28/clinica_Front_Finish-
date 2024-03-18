import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs";
import {DoctorPaginatedDto} from "../../shared/models/doctor-paginated-dto.model";
import {DoctorService} from "../../shared/Services/doctor.service";
import {UserService} from "../../shared/Services/user.service";
import {UserModelDto} from "../../shared/models/user-dto.model";
import {ChangeInfoDoctorService} from "../../shared/Services/change-info-doctor.service";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ConfirmActionComponent} from "../../../../../shared/components/confirm-action/confirm-action.component";
import {EpsDto} from "../../../eps-management/shared/models/eps-dto.interface";
import {FormUpdateEpsComponent} from "../../../eps-management/components/form-update-eps/form-update-eps.component";
import {DoctorUpdate} from "../../shared/models/doctor-update";
import {EpsPaginatedDto} from "../../../eps-management/shared/models/eps-paginated-dto.model";
import {FormUpdateDoctorComponent} from "../form-update-doctor/form-update-doctor.component";
import {NotificationService} from "../../../../../shared/notification.service";

@Component({
  selector: 'app-table-doctor',
  templateUrl: './table-doctor.component.html',
  styleUrls: ['./table-doctor.component.scss']
})


export class TableDoctorComponent {
  modalRefUpdate: MdbModalRef<FormUpdateDoctorComponent> | null = null;
  data: DoctorPaginatedDto[] = [];
  page = 1;
  total = 0;
  perPage = 10;
  totalRecords = 0;

  constructor(public doctorService: DoctorService, private notificationService: NotificationService, public userService: UserService, private changeInfoDoctorService: ChangeInfoDoctorService, private modalService: MdbModalService) {
    this.changeInfoDoctorService.evento.subscribe((data) => {
      this.getData();
    });
  }

  ngOnInit() {
    this.getData(this.page);

  }

  getData(page: number = 1) {
    this.doctorService.getAllPaginated(page, 5).subscribe(response => {
      this.data = response.records;
      this.total = response.totalRecords + 1;
    });
  }

  openModalUpdate(doctorUpdate: DoctorUpdate) {
    this.modalRefUpdate = this.modalService.open(FormUpdateDoctorComponent, {
      modalClass: 'modal-lg',
      data: doctorUpdate,
    });
    if (this.modalRefUpdate) {
      this.modalRefUpdate.component.data = doctorUpdate;
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
    this.userService.getByDocumentNumber(documentNumber).pipe(
      switchMap((userSearched: UserModelDto) => {
        return this.userService.delete(userSearched.id);
      })
    ).subscribe(
      () => {
        this.notificationService.mostrarExito("Usuario eliminado correctamente");

        this.getData();
      },
      () => {
        this.notificationService.mostrarError('Fallo en eliminar, contacte con el administrador')
      }
    );
  }


}

