import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeInfoEpsService {
  evento: EventEmitter<any> = new EventEmitter();
  emitirEvento(data: any) {
    this.evento.emit(data);
  }
}


