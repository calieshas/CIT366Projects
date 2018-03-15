import {Component, OnInit, OnDestroy} from '@angular/core';
import {Document} from '../document.model';
import {DocumentService} from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    }
    );
  }

  ngOnDestroy() {
    this.documentService.documentChangedEvent.unsubscribe();
  }

}
