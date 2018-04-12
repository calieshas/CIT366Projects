import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Document} from './document.model';
import {Subject} from 'rxjs/Subject';
import {HttpResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx'
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  subscription: Subscription;
  maxDocumentId: number;
  documentDB: string = 'https://cms366-53ad7.firebaseio.com/documents.json';


  constructor(private http: HttpClient) {
    this.getDocuments();
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id  === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }
    const pos = this.documents.indexOf(document);
      if (pos < 0) {
        return;
      }

      this.documents.splice(pos, 1);
      this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId: number = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }
    newDocument.id = String(++this.maxDocumentId);
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {

    if (originalDocument === null || newDocument === null) {
      return
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  getDocuments() {
    if (this.documents.length > 0) {
      return this.documents.slice();
    }
    this.http.get(this.documentDB)
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
          return this.documents.slice();
        }
      );
  }

  storeDocuments() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put(this.documentDB, JSON.stringify(this.documents), {headers: headers})
      .subscribe(() => {
        this.documentListChangedEvent.next(this.getDocuments());
      });
     }



}
