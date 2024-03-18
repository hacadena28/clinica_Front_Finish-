import {Component, OnInit} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {FormCreateDoctorComponent} from "./components/form-create-doctor/form-create-doctor.component";

@Component({
  selector: 'app-doctor-management',
  templateUrl: './doctor-management.component.html',
  styleUrls: ['./doctor-management.component.scss']
})
export class DoctorManagementComponent {
  modalRef: MdbModalRef<FormCreateDoctorComponent> | null = null;

  constructor(private modalService: MdbModalService) {
  }

  openModal() {
    this.modalRef = this.modalService.open(FormCreateDoctorComponent, {
      modalClass: 'modal-lg',
    });
  }
}





