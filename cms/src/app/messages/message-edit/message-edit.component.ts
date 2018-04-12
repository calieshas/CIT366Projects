import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from '../message.model';
import {MessageService} from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = '1';
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  addMessageEvent = new EventEmitter<Message>();


  constructor(private messageService: MessageService) {}

  ngOnInit() {
  }


  onSendMessage() {
    const msgTexts = this.msgText.nativeElement.value;
    const subjects = this.subject.nativeElement.value;
    const senderName = this.currentSender;
    const newMessage = new Message(null, subjects, msgTexts, senderName);
    this.addMessageEvent.emit(newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
   this.subject.nativeElement.value = null;
   this.msgText.nativeElement.value = null;
  }
}
