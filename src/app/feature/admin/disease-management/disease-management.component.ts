import {Component} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {FormCreateDiseaseComponent} from "./components/form-create-disease/form-create-disease.component";

@Component({
  selector: 'app-disease-management',
  templateUrl: './disease-management.component.html',
  styleUrls: ['./disease-management.component.scss']
})
export class DiseaseManagementComponent {
  modalRef: MdbModalRef<FormCreateDiseaseComponent> | null = null;

  constructor(private modalService: MdbModalService) {
  }

  openModal() {
    this.modalRef = this.modalService.open(FormCreateDiseaseComponent, {
      modalClass: 'modal-lg',
    });
  }
}
