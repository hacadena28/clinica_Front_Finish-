import {Component, OnInit } from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {FormCreateEpsComponent} from "./components/form-create-eps/form-create-eps.component";

@Component({
  selector: 'app-eps-management',
  templateUrl: './eps-management.component.html',
  styleUrls: ['./eps-management.component.scss']
})
export class EpsManagementComponent{
  modalRef: MdbModalRef<FormCreateEpsComponent> | null = null;
  constructor(private modalService: MdbModalService) {
  }
  openModal() {
    this.modalRef = this.modalService.open(FormCreateEpsComponent, {
      modalClass: 'modal-lg',
    });
  }
}
