import React from "react";
import TextInput from "../components/Search/TextInput";

const FormDisplay = ({ formContents }) => {
  if (!formContents) {
    return <p>No form data provided.</p>;
  }


  return (
    <div className="form-container">
        <h1>{formContents.title}</h1>
        <p>{formContents.description}</p>
        <h3>Applicant: {formContents.author.firstname + formContents.author.lastname}
            <br/>
            Level: {formContents.author.level}
        </h3>
        <hr/>
        {/* form contents*/}
        <iframe 
                  src={`https://docs.google.com/gview?url=${formContents.content}&embedded=true`} 
                  width="100%" 
                  height="500px"
                  style={{ border: "1px solid #ccc", marginTop: "10px" }}
        ></iframe>
        <h3>Form fields</h3>
        <hr/>
        {/* wrap this entire component in a search component to be able to use the text input */}
        {formContents.fields.map((field, index) => (
            <div>
                <label>{field.label}</label>
                <TextInput name={field.name} placeholder={field.placeholder} />
            </div>
        ))}

    </div>
  );
};

export default FormDisplay;
