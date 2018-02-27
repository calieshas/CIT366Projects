import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Document} from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  @Input() documents: Document[] = [
    new Document('1', 'file', 'a file', '555-555-5555', 'file.net', null),
    new Document('2', 'doc', 'a doc', '555-555-4444', 'doc.net', null),
    new Document('3', 'ex', 'a ex', '555-555-3333', 'ex.net', null),
    new Document('4', 'net', 'a net', '555-555-2222', 'net.net', null),
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
