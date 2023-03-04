import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // Arreglo para guardar los mensajes
  mensajes: object[] = [];

  // Constructor para obtener el servicio de sockets
  constructor(private socket: SocketService) {
    // Escuchamos por nuevos mensajes
    this.onRecibirMensaje();
  }

  // Método para enviar un mensaje
  enviarMensaje(infoMensaje: object) {
    // Agregamos el mensaje a nuestra lista de mensajes
    this.mensajes.push(infoMensaje);
    // Enviamos el mensaje utilizando el servicio de sockets
    this.socket.io.emit('enviarMensaje', infoMensaje);
  }

  // Método para recibir un mensaje
  onRecibirMensaje() {
    return new Promise((resolve) => {
      this.socket.io.on('recibirMensaje', (infoMensaje: any) => {
        // Agregamos el mensaje a nuestra lista de mensajes
        infoMensaje.tipoUsuario = 2;
        this.mensajes.push(infoMensaje);
        resolve(infoMensaje);
      });
    });
  }

  // Método para cargar mensajes antiguos
  cargarMensajesAntiguos() {
    return new Promise((resolve) => {
      this.socket.io.emit('solicitarMensajesAntiguos');
      this.socket.io.on('cargarMensajesAntiguos', (mensajes: object[]) => {
        // Agregamos los mensajes a nuestra lista de mensajes
        this.mensajes = mensajes;
        resolve(mensajes);
      });
    });
  }
}
