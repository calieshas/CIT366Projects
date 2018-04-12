import {Component, OnInit} from '@angular/core';
import {Message} from '../message.model';
import {MessageService} from '../message.service';
import {Contact} from '../../contacts/contact.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  message: Message;
  subscription: Subscription;

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  constructor(private messageService: MessageService) {
    this.messages = this.messageService.getMessages();
  }

  ngOnInit() {
    this.messageService.messageChangeEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
      }
    );
    this.subscription = this.messageService.messageChangeEvent
      .subscribe((messageList: Message[]) => {
        this.messages = messageList;
    });
  }

}
