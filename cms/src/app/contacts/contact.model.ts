export class Contact {
  public contactId: String;
  public name: String;
  public email: String;
  public phone: String;
  public imageUrl: String;
  public group: Array;

  constructor(contactId: String, name: String, email: String, phone: String, imageUrl: String, group: Array){
    this.contactId = contactId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = group;
  }
}