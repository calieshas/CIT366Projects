import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Contact} from '../../contacts/contact.model';
import {Message} from '../message.model';
import {MessageService} from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Input() currentSender = 'Caliesha';
  @ViewChild('subject') subject;
  @ViewChild('msgText') msgText;
  @Output() addMessageEvent = new EventEmitter<Message>();


  constructor(private messageService: MessageService) {}

  ngOnInit() {
  }


  onSendMessage() {
    const msgTexts = this.msgText.nativeElement.value;
    const subjects = this.subject.nativeElement.value;
    const message = new Message('1', this.subject, this.msgText, this.currentSender);
    this.messageService.addMessage(message);
  }

  onClear() {
    // assign a blank value to the subject and msgText input elements in the form.
  }
}
