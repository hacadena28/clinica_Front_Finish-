import {Component, OnInit} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {FormCreateAdminComponent} from "./components/form-create-admin/form-create-admin.component";

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent {
  modalRef: MdbModalRef<FormCreateAdminComponent> | null = null;

  constructor(private modalService: MdbModalService) {
  }

  openModal() {
    this.modalRef = this.modalService.open(FormCreateAdminComponent, {
      modalClass: 'modal-lg',
    });
  }
}





