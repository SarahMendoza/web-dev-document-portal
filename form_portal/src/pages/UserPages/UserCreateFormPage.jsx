// user page to create a new form, with save or submit options
import "./UserCreateFormPage.css";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormTemplate from "../../components/Form/FormTemplate.jsx";
import Button from "../../components/Button";
import axios from "axios";

const UserCreateFormPage = () => {
  const [formTemplates, setFormTemplates] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentTemplateId, setCurrentTemplateId] = useState("PLEASE SELECT");
  const [dropDownText, setDropDownText] = useState("Select Form Type");

  // Function to fetch available form templates from the API
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

  // Handle form data updates from child component
  const handleFormUpdate = (updatedData) => {
    setFormData(updatedData);
  };

  // Handle template selection from dropdown
  const handleTemplateSelect = (eventKey) => {
    const selectedTemplate = formTemplates[eventKey];
    setCurrentTemplateId(selectedTemplate.formTemplateId);
    setDropDownText(selectedTemplate.formTitle);
  };

  // Check if form is complete before submission
  const isFormComplete = () => {
    // This should be implemented based on your form validation requirements
    return Object.keys(formData).length > 0;
  };

  // Handle form submission
  const handleSubmitForm = () => {
    if (!isFormComplete()) {
      alert("Please complete all fields before submitting.");
      return;
    }
    
    // In a real implementation, you would send the form data to your backend
    // For now, just show an alert with form details
    alert(
      "Your form has been submitted!\nForm ID: " +
        currentTemplateId +
        "-" +
        localStorage.getItem("username") +
        "-" +
        Date.now()
    );
  };

  // Handle saving form for later
  const handleSaveForm = () => {
    alert(
      "Your form has been saved for later!\nForm ID: " +
        currentTemplateId +
        "-" +
        localStorage.getItem("username") +
        "-" +
        Date.now()
    );
  };

  // Fetch form templates when component mounts
  useEffect(() => {
    fetchFormTemplates();
  }, []);

  return (
    <div className="main-page-content">
      <h2>Create Form</h2>
      <p>
        Fill out a new digital form by selecting from the options below. Make
        sure to add your required signees and complete all form contents.
      </p>
      
      <div>
        <p>Select form type:</p>
        <div className="inline-container">
          {isLoading ? (
            <p>Loading form templates...</p>
          ) : error ? (
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
                {formTemplates.map((template, index) => (
                  <Dropdown.Item eventKey={index} key={index}>
                    {template.formTitle} -- {template.formTemplateId}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <span>Form ID: {currentTemplateId}</span>
            </>
          )}
        </div>
      </div>
      
      <p></p>
      <p>Form preview:</p>
      
      {/* Display dynamic form component */}
      {currentTemplateId !== "PLEASE SELECT" && (
        <FormTemplate 
          formTypeId={currentTemplateId} 
          onFormUpdate={handleFormUpdate} 
        />
      )}
      
      <br />
      <Button 
        text="Save Form" 
        onClick={handleSaveForm} 
        disabled={currentTemplateId === "PLEASE SELECT"} 
      />
      <br />
      <Button 
        text="Submit" 
        onClick={handleSubmitForm} 
        disabled={currentTemplateId === "PLEASE SELECT"} 
      />
    </div>
  );
};

export default UserCreateFormPage;