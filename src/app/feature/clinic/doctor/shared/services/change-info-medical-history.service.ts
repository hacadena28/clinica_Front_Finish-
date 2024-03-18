import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeInfoMedicalHistoryService {
  evento: EventEmitter<any> = new EventEmitter();

  emitirEvento(data: any) {
    this.evento.emit(data);
  }
}
