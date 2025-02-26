class FormContents {
    constructor({ id, title, description, content, author, fields, signatures }) {
      this.id = id;  
      this.title = title;
      this.description = description;
      this.content = content; // pdf file
      this.author = author; // {level, firstname, lastname}
      this.fields = fields; // should be an array of {label, placeholder} objects
      this.signatures = signatures; // should be an array of {level, title, firstname, lastname, signature, date, signed} objects
    }
  }
  
  export default FormContents;
  