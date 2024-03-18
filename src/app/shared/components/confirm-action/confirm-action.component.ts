import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss']
})
export class ConfirmActionComponent {
  constructor(public modalRef: MdbModalRef<ConfirmActionComponent>) {}

  cancelarAccion() {
    this.modalRef.close(false);
  }

  confirmarAccion() {
    this.modalRef.close(true);
  }
}
