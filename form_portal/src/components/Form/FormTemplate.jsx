import React, { useState, useEffect } from "react";
import { FormTemplateData } from "./FormTemplateData";
import Table from "../Table";

const FormTemplate = ({ formTypeId }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const data = FormTemplateData.find(
      (form) => form.formTypeId === formTypeId
    );
    setFormData(data);
  }, [formTypeId]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-template-content">
      <div className="form-template-header">
        <h1>{formData.header.formTitle}</h1>
        <p>{formData.header.formDescr}</p>
      </div>
      <div className="form-template-applicantInfo">
        <input
          type="text"
          placeholder="First Name"
          value={formData.applicantInfo.applicantFirstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.applicantInfo.applicantLastName}
        />
      </div>
      <div className="form-template-formContent">
        <input
          type="text"
          placeholder="First Name"
          value={formData.formContent.firstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.formContent.lastName}
        />
      </div>
      <Table
        data={formData.formContent}
        columns={Object.keys(formData.formContent)}
      />
      <div className="form-template-signatures"></div>
      {Object.keys(formData.signatures.info).map((key, index) => (
        <div key={index}>
          <p>{formData.signatures.info[key].title}</p>
        </div>
      ))}
    </div>
  );
};

export default FormTemplate;
