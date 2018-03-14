import {Component, OnInit} from '@angular/core';
import {Document} from '../document.model';
import {DocumentService} from '../document.service';
import {Message} from '../../messages/message.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  providers: [DocumentService]
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = this.documents;
      // what is the route back... navigate?
    }
    );
  }
}
