import {EventEmitter, Injectable} from '@angular/core';
import {Message} from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import {HttpResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx'
import {ContactService} from '../contacts/contact.service';
import {Contact} from '../contacts/contact.model';

@Injectable()
export class MessageService {
  messages: Message[] = [];
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  messageDB: string = 'https://cms366-53ad7.firebaseio.com/messages.json';


  constructor(private http: HttpClient, private contactService: ContactService) {
    this.getMessages();
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id  === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.messages) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages() {
    if (this.messages.length > 0) {
      return this.messages.slice();
    }
    this.contactService.getContacts();
    this.contactService.contactListChangedEvent.subscribe((contacts: Contact[])=> {
      this.http.get(this.messageDB)
        .subscribe(
          (messages: Message[]) => {
            this.messages = messages;
            this.maxMessageId = this.getMaxId();
            this.messageChangeEvent.next(this.messages.slice());
          }
        );
    })
  }

  storeMessages() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put(this.messageDB, JSON.stringify(this.messages), {headers: headers})
      .subscribe(() => {
        this.messageChangeEvent.next(this.getMessages());
      });
  }

}
