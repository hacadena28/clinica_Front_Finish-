import {Component} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";

import {NotificationService} from "../../../../../shared/notification.service";
import {ConfirmActionComponent} from "../../../../../shared/components/confirm-action/confirm-action.component";
import {DiseasePaginatedDto} from "../../shared/models/disease-paginated-dto.model";
import {ChangeInfoDiseaseService} from "../../shared/service/change-info-disease.service";
import {FormUpdateDiseaseComponent} from "../form-update-disease/form-update-disease.component";
import {DiseaseService} from "../../shared/service/disease.service";
import {DiseaseDto} from "../../shared/models/disease-dto.interface";

@Component({
    selector: 'app-table-disease',
    templateUrl: './table-disease.component.html',
    styleUrls: ['./table-disease.component.scss']
})
export class TableDiseaseComponent {
    modalRefUpdate: MdbModalRef<FormUpdateDiseaseComponent> | null = null;
    data: DiseasePaginatedDto[] = [];
    page = 1;
    total = 0;
    perPage = 5;
    totalRecords = 0;

    constructor(
        public diseaseService: DiseaseService,
        private notificationService: NotificationService,
        private changeInfoDiseaseService: ChangeInfoDiseaseService,
        private modalService: MdbModalService
    ) {
        this.changeInfoDiseaseService.evento.subscribe((data) => {
            debugger
            this.getData();
        });
    }

    ngOnInit() {
        this.getData(this.page);
    }

    getData(page: number = 1) {
        this.diseaseService.getAllPaginated(page, 5).subscribe(response => {
            this.data = response.records;
            this.total = response.totalRecords;
        });
    }

    openModalUpdate(disease: DiseaseDto) {
        this.modalRefUpdate = this.modalService.open(FormUpdateDiseaseComponent, {
            modalClass: 'modal-lg',
            data: disease,
        });
        if (this.modalRefUpdate) {
            this.modalRefUpdate.component.data = disease;
        }
    }

    pageChanged(page: number) {
        this.page = page;
        this.getData(this.page);
    }

    abrirModalConfirmacion(id: string) {
        const modalRef: MdbModalRef<ConfirmActionComponent> = this.modalService.open(ConfirmActionComponent);
        modalRef.onClose.subscribe((result) => {
            if (result) {
                this.diseaseService.delete(id).subscribe((result) => {
                    this.getData();
                    this.notificationService.mostrarExito("Enfermedad Eliminada con exito");

                }, () => {
                    this.notificationService.mostrarExito("Fallo en eliminar, contacte con el administrador");
                });
            } else {
                console.log('Eliminación cancelada');
            }
        });
    }
}
