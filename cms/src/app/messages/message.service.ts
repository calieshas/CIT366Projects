import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Message} from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';

@Injectable()
export class MessageService {
  @Input() messages: Message[] = [];
  @Output() messageChangeEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id  === id) {
        return message;
      }
    }
    return null;
  }

}
