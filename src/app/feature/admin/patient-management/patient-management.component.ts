import {Component, OnInit} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {FormCreatePatientComponent} from "./components/form-create-patient/form-create-patient.component";

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.scss']
})
export class PatientManagementComponent {
  modalRef: MdbModalRef<FormCreatePatientComponent> | null = null;

  constructor(private modalService: MdbModalService) {
  }

  openModal() {
    this.modalRef = this.modalService.open(FormCreatePatientComponent, {
      modalClass: 'modal-lg',
    });
  }
}






