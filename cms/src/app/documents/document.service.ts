import {EventEmitter, Injectable} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import {Document} from './document.model';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;


  constructor(private http: Http) {
    this.initDocuments();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
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
      let documentsListClone = this.documents.slice();
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
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentListClone: Document[] = this.documents.slice();
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument || newDocument === null) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone: Document[] = this.documents.slice();
    this.storeDocuments();
  }

  initDocuments() {
    this.http.get('https://cms366-53ad7.firebaseio.com/documents')
      .map(
        (response: Response) => {
          const documents: Document[] = response.json().obj;
          return documents;
        }
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.getDocuments());
        }
      );
  }

  storeDocuments() {
    this.http.put('https://cms366-53ad7.firebaseio.com/documents', JSON.stringify(this.documents))
      .subscribe(() => {
        this.documentListChangedEvent.next(this.getDocuments());
      });
     }


}
