import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {

  // emits item of contact type called selectedContact
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  @Input() contact: Contact = null;
  @Input() contacts: Contact[] = [];

  constructor(private contactService: ContactService){
    this.contacts = contactService.getContacts();
  }

  ngOnInit() {
    console.log('this component was just loaded');
  }

  // sends the selectedContact from "this" class up to the parent
  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }

}
