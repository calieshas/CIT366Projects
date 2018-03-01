import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Document} from '../document.model';
import {DocumentService} from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  providers: [DocumentService]
})
export class DocumentListComponent implements OnInit {
  @Input() documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

}
