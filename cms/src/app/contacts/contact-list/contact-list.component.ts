import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';
import {Document} from '../../documents/document.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {
  @Input() contact: Contact = null;
  @Input() contacts: Contact[] = [];


  constructor(private contactService: ContactService) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = this.contacts;
  }
    );
  }
  // onSelected(contact: Contact) {
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }
}
