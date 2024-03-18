import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeInfoPatientService {
  evento: EventEmitter<any> = new EventEmitter();

  emitirEvento(data: any) {
    this.evento.emit(data);
  }
}


