import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChangeInfoDiseaseService {
    evento: EventEmitter<any> = new EventEmitter();

    emitirEvento(data: any) {
        this.evento.emit(data);
    }
}
