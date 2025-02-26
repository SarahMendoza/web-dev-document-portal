import React, { useState, useEffect } from "react";
import { FormTemplateData } from "./FormTemplateData";
import Table from "../Table";

const FormTemplate = (formTypeId) => {
  const [filteredForms, setFilteredForms] = useState([]);

  useEffect(() => {
    // Filter the array to get only the matching form
    const selectedForms = FormTemplateData.filter(
      (form) => form.formTypeId === formTypeId
    );
    setFilteredForms(selectedForms);
  }, [formTypeId]);

  // Check if the filteredForms array is empty before rendering
  if (filteredForms.length === 0) {
    return <p>Form not found</p>;
  }

  return (
    <div className="form-template-content">
      FORM PREVIEW
      <div className="form-template-header">Header</div>
      <div className="form-template-applicantInfo">Applicant Info </div>
      <div className="form-template-formContent">content</div>
      <Table
        data={FormTemplateData.formType.formContent}
        columns={FormTemplateData.formType.formContent.keys}
      />
      <div className="form-template-signatures">Signatures</div>
    </div>
  );
};

export default FormTemplate;
