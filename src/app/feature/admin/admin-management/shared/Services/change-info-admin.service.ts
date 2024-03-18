import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeInfoAdminService {
  evento: EventEmitter<any> = new EventEmitter();

  emitirEvento(data: any) {
    this.evento.emit(data);
  }
}


