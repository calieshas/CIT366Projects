import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[] = [
    new Message('msg1', 'hi', 'hello, how are you?', 'Bill'),
    new Message('msg2', 'wow', 'thats cool', 'Jane'),
    new Message('msg3', 'warning', 'dont forget', 'Sam')
    ];

  onAddMessage(message: Message) {
    // pg 24 last step
  }

  constructor() { }

  ngOnInit() {
  }

}
