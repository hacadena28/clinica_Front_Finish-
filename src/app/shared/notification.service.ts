import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  mostrarExito(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: mensaje,
    });
  }

  mostrarInfo(mensaje: string) {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      text: mensaje,
    });
  }

  mostrarError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    });
  }
}
