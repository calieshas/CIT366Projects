import {Component, OnInit, OnDestroy} from '@angular/core';
import {Document} from '../document.model';
import {DocumentService} from '../document.service';
import {Subscription} from 'rxjs/Subscription';
import {Contact} from '../../contacts/contact.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  subscription: Subscription;

  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
    // this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
      }
    );
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documentList: Document[]) => {
          this.documents = documentList;
    }
    );
  }

}
