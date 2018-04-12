import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';
import {HttpResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx'
import {Subscription} from 'rxjs/Subscription';


@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  subscription: Subscription;
  maxContactId: number;
  contactDB: string = 'https://cms366-53ad7.firebaseio.com/contacts.json';



  constructor(private http: HttpClient) {
    this.getContacts();
    this.maxContactId = this.getMaxId();
    // this.contacts = MOCKCONTACTS;
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
    if (newContact) {
      newContact.id = String(++this.maxContactId);
      this.contacts.push(newContact);
      this.storeContacts();
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {

    if (originalContact === null || newContact === null) {
      return
    }

      let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return
    }

      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
      this.storeContacts();
    }


  getContacts() {
    if (this.contacts.length > 0) {
      return this.contacts.slice();
    }
    this.http.get(this.contactDB)
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
          return this.contacts.slice();
        }
      );
  }

  storeContacts() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put(this.contactDB, JSON.stringify(this.contacts), {headers: headers})
      .subscribe(() => {
        this.contactListChangedEvent.next(this.getContacts());
      });
  }


}
