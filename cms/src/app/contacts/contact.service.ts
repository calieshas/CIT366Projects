import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';
import {Document} from '../documents/document.model';
import {Http} from '@angular/http';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: Http) {
    this.initContacts();
  }

  getContacts(): Contact[] {
  return this.contacts.slice();
}

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId: number = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactListClone: Contact[] = this.contacts.slice();
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact || newContact === null) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone: Contact[] = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone)
  }

  initContacts() {
    this.http.get('https://cms366-53ad7.firebaseio.com/contacts')
      .map(
        (response: Response) => {
          const contacts: Contact[] = response.json().obj;
          return contacts;
        }
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.getContacts());
        }
      );
  }

  storeContacts() {
    this.http.put('https://cms366-53ad7.firebaseio.com/contacts', JSON.stringify(this.contacts))
      .subscribe(() => {
        this.contactListChangedEvent.next(this.getContacts());
      });
  }

}
