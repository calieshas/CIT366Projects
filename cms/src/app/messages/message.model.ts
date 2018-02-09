export class Message {
  public messageId: String;
  public subject: String;
  public msgText: String;
  public sender: String;


  constructor(messageId: String, subject: String, msgText: String, sender: String) {
    this.messageId = messageId;
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;
  }
}
