import React, { useState, useEffect } from "react";
import { FormTemplateData } from "./FormTemplateData";
import Table from "../Table";

const FormTemplate = ({ formTypeId }) => {
  const [formData, setFormData] = useState(null);
  const [formValues, setFormValues] = useState({
    applicantInfo: {},
    formContent: {},
    signatures: {},
  });

  useEffect(() => {
    const data = FormTemplateData.find(
      (form) => form.formTypeId === formTypeId
    );

    if (data) {
      setFormData(data);

      // Initialize state with empty values for all input fields
      setFormValues({
        applicantInfo: Object.keys(data.applicantInfo || {}).reduce(
          (acc, key) => ({ ...acc, [key]: "" }),
          {}
        ),
        formContent: Object.keys(data.formContent?.info || {}).reduce(
          (acc, key) => ({ ...acc, [key]: "" }),
          {}
        ),
        signatures: Object.keys(data.signatures?.info || {}).reduce(
          (acc, key) => ({ ...acc, [key]: { firstName: "", lastName: "" } }),
          {}
        ),
      });
    } else {
      // Reset state if no form is selected
      setFormData(null);
      setFormValues({ applicantInfo: {}, formContent: {}, signatures: {} });
    }
  }, [formTypeId]);

  const handleChange = (section, key, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: field ? { ...prev[section][key], [field]: value } : value,
      },
    }));
  };

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
        {Object.keys(formData.applicantInfo).map((key) => (
          <div key={key}>
            <p>
              {formData.applicantInfo[key]}:{" "}
              <input
                type="text"
                placeholder={formData.applicantInfo[key]}
                value={formValues.applicantInfo[key] || ""}
                onChange={(e) =>
                  handleChange("applicantInfo", key, null, e.target.value)
                }
              />
            </p>
          </div>
        ))}
      </div>

      <div className="form-template-formContent">
        <h4>Form Content</h4>
        {Object.keys(formData.formContent.info).map((key) => (
          <div key={key}>
            <p>
              {formData.formContent.info[key]}:{" "}
              <input
                type="text"
                placeholder={formData.formContent.info[key]}
                value={formValues.formContent[key] || ""}
                onChange={(e) =>
                  handleChange("formContent", key, null, e.target.value)
                }
              />
            </p>
          </div>
        ))}
      </div>

      <div className="form-template-signatures">
        <h4>Signatures</h4>
        {Object.keys(formData.signatures.info).map((key) => (
          <div key={key}>
            <p>{formData.signatures.info[key].title}</p>
            <input
              type="text"
              placeholder="First Name"
              value={formValues.signatures[key]?.firstName || ""}
              onChange={(e) =>
                handleChange("signatures", key, "firstName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formValues.signatures[key]?.lastName || ""}
              onChange={(e) =>
                handleChange("signatures", key, "lastName", e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormTemplate;
