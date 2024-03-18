import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeInfoAppointment {
  evento: EventEmitter<any> = new EventEmitter();
  emitirEvento(data: any) {
    this.evento.emit(data);
  }
}
