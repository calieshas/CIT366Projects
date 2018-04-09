import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Message} from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import {Contact} from '../contacts/contact.model';
import {Http} from '@angular/http';

@Injectable()
export class MessageService {
  @Input() messages: Message[] = [];
  @Output() messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: Number;


  constructor(private http: Http) {
    this.initMessages()
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

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId: number = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  initMessages() {
    this.http.get('https://cms366-53ad7.firebaseio.com/messages')
      .map(
        (response: Response) => {
          const messages: Message[] = response.json().obj;
          return messages;
        }
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangeEvent.next(this.getMessages());
        }
      );
  }

  storeMessages() {
    this.http.put('https://cms366-53ad7.firebaseio.com/messages', JSON.stringify(this.messages))
      .subscribe(() => {
        this.messageChangeEvent.next(this.getMessages());
      });
  }

}
