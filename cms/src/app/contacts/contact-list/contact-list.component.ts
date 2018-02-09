import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  // emits item of contact type called selectedContact
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  @Input() contact: Contact = null;
  @Input() contacts: Contact[] = [
    new Contact('1', 'Bro. Jackson', 'jacksonk@byui.edu', '2084963771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '2084963768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];

  constructor() { }

  ngOnInit() {
    console.log('this component was just loaded');
  }

  // sends the selectedContact from "this" class up to the parent
  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }

}
