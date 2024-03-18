import {Component, OnInit} from '@angular/core';
import {MedicalHistoryDto} from "../shared/models/medicalHistory-dto.interface";

import {MedicalHistoryPaginatedDto} from "../shared/models/medicalHistory-paginated-dto.model";
import {MedicalHistoryService} from "../shared/services/medical-history.service";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {
  FormCreateEpsComponent
} from "../../../admin/eps-management/components/form-create-eps/form-create-eps.component";
import {AgregarHistoriaClinicaComponent} from "../agregar-historia-clinica/agregar-historia-clinica.component";
import {ChangeInfoEpsService} from "../../../admin/eps-management/shared/service/chage-info-eps.service";
import {ChangeInfoMedicalHistoryService} from "../shared/services/change-info-medical-history.service";

@Component({
  selector: 'app-consultar-medical-history',
  templateUrl: './consultar-medical-history.component.html',
  styleUrls: ['./consultar-medical-history.component.scss']
})
export class ConsultarMedicalHistoryComponent implements OnInit {
  modalRef: MdbModalRef<AgregarHistoriaClinicaComponent> | null = null;
  valorBusqueda: string = '';
  user: string = localStorage.getItem("user")!;
  userObject = JSON.parse(this.user);
  isDoctor: boolean = false

  constructor(private medicalHistory: MedicalHistoryService, private modalService: MdbModalService, private changeInfoMedicalHistoryService: ChangeInfoMedicalHistoryService) {
    this.changeInfoMedicalHistoryService.evento.subscribe((data) => {
      this.getData(this.valorBusqueda)
      console.log(this.valorBusqueda)


    })
  }

  data: MedicalHistoryPaginatedDto[] = [];
  page = 1;
  total = 0;
  perPage = 10;
  totalRecords = 0;


  ngOnInit(): void {
 if(this.userObject.role === "Doctor"){
   this.isDoctor = true
 }
      this.getData(this.valorBusqueda)
  }

  buscar() {

    this.getData(this.valorBusqueda)


  }

  openModal() {
    this.modalRef = this.modalService.open(AgregarHistoriaClinicaComponent, {
      modalClass: 'modal-lg',

    });
  }

  getData(documentNumber: string) {
    this.medicalHistory.getById(documentNumber).subscribe(response => {
      this.data = response.records;
      this.total = response.totalRecords;
      console.log(response);
    });
  }
}
