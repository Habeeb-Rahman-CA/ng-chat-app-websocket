import { Component, inject, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: {content: string, timestamp: string}[] = []
  message: string = ''

  websocketService = inject(WebsocketService)

  ngOnInit(): void {
    this.websocketService.getMessages().subscribe((message: any) => {
      this.messages.push(message)
    })

    console.log(this.messages);
  }

  sendMessage() {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message)
      this.message = ''
    }
  }

}
