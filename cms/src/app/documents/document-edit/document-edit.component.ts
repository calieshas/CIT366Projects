import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../document.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Form, NgForm} from '@angular/forms';
import {Document} from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  document: Document;
  originalDocument:Document;
  editMode: boolean = false;
  id: string;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.originalDocument = this.documentService.getDocument(params['id']);
        if (this.originalDocument) {
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    const document: Document = new Document('1', values.title, values.description, values.url, null);

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, document);
    }
    else {
      this.documentService.addDocument(document);
    }
      this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }



}
