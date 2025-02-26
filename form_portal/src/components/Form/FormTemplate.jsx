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
    return <div>Select a form template...</div>;
  }

  return (
    <div className="form-template-content">
      <div className="form-template-header">
        <h1>{formData.header.formTitle}</h1>
        <p>{formData.header.formDescr}</p>
      </div>
      <div className="form-template-applicantInfo">
        <h4>Applicant Information</h4>
        {Object.keys(formData.applicantInfo).map((key, index) => (
          <div key={index}>
            <p>
              {key + ": "}
              <input
                type="text"
                placeholder={formData.applicantInfo[key]}
                value={formData.applicantInfo.applicantFirstName}
              />
            </p>
          </div>
        ))}
      </div>
      <div className="form-template-formContent">
        <h4>Form Content</h4>
        {Object.keys(formData.formContent.info).map((key, index) => (
          <div key={index}>
            <p>
              {formData.formContent.info[key] + ": "}
              <input
                type="text"
                placeholder={formData.formContent.info[key]}
                value={formData.applicantInfo.applicantFirstName}
              />
            </p>
          </div>
        ))}
      </div>
      <div className="form-template-signatures">
        <h4>Signatures</h4>
        {Object.keys(formData.signatures.info).map((key, index) => (
          <div key={index}>
            <p>{formData.signatures.info[key].title}</p>
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
        ))}
      </div>
    </div>
  );
};

export default FormTemplate;
