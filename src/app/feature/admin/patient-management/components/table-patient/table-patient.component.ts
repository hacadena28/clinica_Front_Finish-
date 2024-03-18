import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs";
import {PatientService} from "../../shared/Services/patient.service";
import {UserModelDto} from "../../../doctor-management/shared/models/user-dto.model";
import {PatientPaginatedDto} from "../../shared/models/patient-paginated-dto.model";
import {EpsService} from "../../../eps-management/shared/service/eps.service";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {
  FormUpdateDoctorComponent
} from "../../../doctor-management/components/form-update-doctor/form-update-doctor.component";
import {FormUpdatePatientComponent} from "../form-update-patient/form-update-patient.component";
import {ChangeInfoDoctorService} from "../../../doctor-management/shared/Services/change-info-doctor.service";
import {DoctorUpdate} from "../../../doctor-management/shared/models/doctor-update";
import {PatientUpdate} from "../../shared/models/patient-update";
import {ConfirmActionComponent} from "../../../../../shared/components/confirm-action/confirm-action.component";
import {UserPatientService} from "../../shared/Services/user-patient.service";
import {ChangeInfoPatientService} from "../../shared/Services/change-info-patient.service";
import {NotificationService} from "../../../../../shared/notification.service";

@Component({
  selector: 'app-table-patient',
  templateUrl: './table-patient.component.html',
  styleUrls: ['./table-patient.component.scss']
})
export class TablePatientComponent implements OnInit {
  modalRefUpdate: MdbModalRef<FormUpdatePatientComponent> | null = null;
  data: PatientPaginatedDto[] = [];
  page = 1;
  total = 0;
  perPage = 10;
  totalRecords = 0;

  constructor(public patientService: PatientService, private notificationService: NotificationService,
              public userPatientService: UserPatientService, public epsService: EpsService, private changeInfoPatientService: ChangeInfoPatientService, private modalService: MdbModalService) {
    this.changeInfoPatientService.evento.subscribe((data) => {
      this.getData();
    });
  }

  ngOnInit() {
    this.getData(this.page);
  }

  getData(page: number = 1) {
    this.patientService.getAllPaginated(page, 5).subscribe(response => {
      this.data = response.records;
      this.total = response.totalRecords + 1;
    });
  }

  openModalUpdate(patientUpdate: PatientUpdate) {
    this.modalRefUpdate = this.modalService.open(FormUpdatePatientComponent, {
      modalClass: 'modal-lg',
      data: patientUpdate,
    });
    if (this.modalRefUpdate) {
      this.modalRefUpdate.component.data = patientUpdate;
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
    this.userPatientService.getByDocumentNumber(documentNumber).pipe(
      switchMap((userSearched: UserModelDto) => {
        return this.userPatientService.delete(userSearched.id);
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


