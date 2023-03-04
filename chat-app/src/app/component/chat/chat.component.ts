import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  // Variable para guardar el texto del mensaje
  texto: string = '';
  // Arreglo para guardar los mensajes
  mensajes: any[] = [];

  // Variable para guardar el tipo del usuario:
  tipoUsuario = 1;

  ultimaVezEnLinea = 'Hace 5 minutos'

  // Constructor para obtener el servicio de chat
  constructor(private servicioChat: ChatService) {
    // Inicializamos los mensajes con los que ya existen en el servicio
    this.mensajes = this.servicioChat.mensajes;

    this.servicioChat.cargarMensajesAntiguos().then((mensajes: any) => {
      this.mensajes = mensajes;
    });
  }

  // Método para enviar un mensaje
  enviarMensaje() {
    // Agregamos el mensaje a nuestra lista de mensajes
    this.mensajes = this.servicioChat.mensajes;
    let infoMensaje = {
      texto: this.texto,
      fecha: new Date().getHours() + ':' + new Date().getMinutes(),
      tipoUsuario: this.tipoUsuario,
    };
    // Enviamos el mensaje utilizando el servicio de chat
    this.servicioChat.enviarMensaje(infoMensaje);
    // Limpiamos el campo de texto
    this.texto = '';
  }

  cambiarUsuario(){
    this.tipoUsuario = this.tipoUsuario == 1 ? 2 : 1;
  }
}
