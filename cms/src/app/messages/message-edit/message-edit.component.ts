import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Contact} from '../../contacts/contact.model';
import {Message} from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Input() currentSender = 'Caliesha';
  // Do I need : string ^ ?
  @ViewChild('subject') subject;
  @ViewChild('msgText') msgText;
  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    // get the value stored in the subject input element
    // get the value stored in the msgText input element
    // Create a new Message object
    // Assign a hardcoded number to the id property in the new
    // Message object
    // Assign the value of the currentSender class variable to
    // the sender property in the new Message object.
    //   Assign the values retrieved from the subject and msgText
    // input elements to the corresponding properties in the new
    // Message object
    // Call the addMessageEvent emitter’s emit() function and
    // pass it the new Message object just created
  }

  // onClear

  constructor() {}

  ngOnInit() {
  }

}
