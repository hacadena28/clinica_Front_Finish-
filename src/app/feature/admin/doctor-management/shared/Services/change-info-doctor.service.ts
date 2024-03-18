
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeInfoDoctorService {
  evento: EventEmitter<any> = new EventEmitter();
  emitirEvento(data: any) {
    this.evento.emit(data);
  }
}


