export class Document {
  public documentId: String;
  public name: String;
  public description: String;
  public phone: String;
  public fileUrl: String;
  public children: Document[] = [];


  constructor(documentId: String, name: String, description: String, phone: String, fileUrl: String, children: Document[]) {
    this.documentId = documentId;
    this.name = name;
    this.description = description;
    this.phone = phone;
    this.fileUrl = fileUrl;
    this.children = children;
  }
}
