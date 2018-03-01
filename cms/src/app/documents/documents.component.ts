import {Component, Input, OnInit} from '@angular/core';
import {Document} from './document.model';
import {DocumentService} from './document.service';
import {Contact} from '../contacts/contact.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() selectedDocument: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
   this.documentService.documentSelectedEvent.subscribe(
     (document: Document) => document
   );
  }

}
