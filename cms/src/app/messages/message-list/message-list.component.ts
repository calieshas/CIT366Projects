import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../message.model';
import {MessageService} from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[] = [];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  constructor(private messageService: MessageService) {
    this.messages = messageService.getMessages();
  }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangeEvent.subscribe((messages: Message[]) => {
      this.messages = this.messages;
    }
    );
  }

}
