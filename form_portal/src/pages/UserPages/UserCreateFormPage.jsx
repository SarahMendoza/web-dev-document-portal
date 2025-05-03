import "./UserCreateFormPage.css";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "../../components/Button";
import axios from "axios";

const UserCreateFormPage = () => {
  const [formTemplates, setFormTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentTemplateId, setCurrentTemplateId] = useState("PLEASE SELECT");
  const [dropDownText, setDropDownText] = useState("Select Form Type");

  const [fieldValues, setFieldValues] = useState({});

  // Fetch list of available form templates
  const fetchFormTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/template/all");
      setFormTemplates(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching form templates:", err);
      setError("Failed to load form templates. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch details for a specific template
  const fetchTemplateDetails = async (templateId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/template/${templateId}`);
      const data = response.data;
      setSelectedTemplate(data);

      // Initialize field input states
      const initialFields = {};
      data.fieldTemplateList.forEach((field) => {
        initialFields[field.id] = "";
      });
      setFieldValues(initialFields);

      setError(null);
    } catch (err) {
      console.error("Error fetching template details:", err);
      setError("Failed to load template details. Please try again later.");
      setSelectedTemplate(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle dropdown selection
  const handleTemplateSelect = (eventKey) => {
    const index = Number(eventKey);
    const template = formTemplates[index];
    if (template) {
      setCurrentTemplateId(template.formTemplateId);
      setDropDownText(template.formTitle);
      fetchTemplateDetails(template.formTemplateId);
    }
  };

  // Handle updates to field inputs
  const handleFieldChange = (id, value) => {
    setFieldValues((prev) => ({ ...prev, [id]: value }));
  };

  // Check if form is complete before actions
  const isFormComplete = () => {
    if (!selectedTemplate) return false;
    return Object.values(fieldValues).every((val) => val.trim() !== "");
  };

  // Submit form data to API
  const handleSubmitForm = async () => {
    if (!isFormComplete()) {
      alert("Please complete all fields before submitting.");
      return;
    }

    const username = localStorage.getItem("username");
    const body = Object.entries(fieldValues).map(([fieldTemplateId, data]) => ({
      fieldTemplateId: Number(fieldTemplateId),
      form: null,
      data,
    }));

    try {
      await axios.post(`http://localhost:8080/form/new/${username}`, body);
      alert("Form submitted successfully!");
      // Optionally reset state or navigate away
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit form. Please try again later.");
    }
  };

  // Save form locally (unchanged behavior)
  const handleSaveForm = () => {
    alert(
      `Your form has been saved for later!\nForm ID: ${currentTemplateId}-${localStorage.getItem("username")}-${Date.now()}`
    );
  };

  useEffect(() => {
    fetchFormTemplates();
  }, []);

  return (
    <div className="main-page-content">
      <h2>Create Form</h2>
      <p>
        Fill out a new digital form by selecting from the options below. Make
        sure to complete all required fields.
      </p>

      <div>
        <p>Select form type:</p>
        <div className="inline-container">
          {isLoading && !selectedTemplate ? (
            <p>Loading form templates...</p>
          ) : error && !selectedTemplate ? (
            <div className="error-message">
              {error}
              <button onClick={fetchFormTemplates}>Try Again</button>
            </div>
          ) : (
            <>
              <DropdownButton
                id="dropdown-basic-button"
                title={dropDownText}
                onSelect={handleTemplateSelect}
              >
                {formTemplates.map((template, idx) => (
                  <Dropdown.Item eventKey={idx} key={idx}>
                    {template.formTitle} -- {template.formTemplateId}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <span>Form ID: {currentTemplateId}</span>
            </>
          )}
        </div>
      </div>

      <p>Form preview:</p>

      {selectedTemplate && (
        <div className="template-display">
          <h3>{selectedTemplate.formTitle} ({selectedTemplate.formTemplateId})</h3>
          <p>{selectedTemplate.formHeader}</p>

          <div className="fields-section">
            <h4>Fields</h4>
            {selectedTemplate.fieldTemplateList.map((field) => (
              <div key={field.id} className="field-row">
                <label htmlFor={`field-${field.id}`}>{field.fieldLabel}</label>
                <input
                  id={`field-${field.id}`}
                  type="text"
                  value={fieldValues[field.id] || ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="signatures-section">
            <h4>Signatures</h4>
            {selectedTemplate.signatureTemplateList.map((sig) => (
              <div key={sig.id} className="signature-row">
                <span className="sig-title">
                  {sig.title} (Level {sig.userLevel})
                </span>
              </div>
            ))}
          </div>

          <div className="actions">
            <Button
              text="Save Form"
              onClick={handleSaveForm}
              disabled={!isFormComplete()}
            />
            <Button
              text="Submit"
              onClick={handleSubmitForm}
              disabled={!isFormComplete()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCreateFormPage;
