import { Injectable } from '@angular/core';
import { Observable, Subject, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: WebSocket
  messageSubject: Subject<any> = new Subject<any>()

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080')

    this.socket.onmessage = (event) => {
      this.messageSubject.next(JSON.parse(event.data))
    }
  }

  sendMessage(message: string){
    const messageData = {
      content: message,
      timestamp: new Date().toISOString()
    }
    this.socket.send(JSON.stringify(messageData))
  }

  getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.onmessage = (event) => {
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const message = JSON.parse(reader.result as string);
            observer.next(message);
          };
          reader.readAsText(event.data);
        } else {
          observer.next(JSON.parse(event.data));
        }
      };
    });
  }

}
