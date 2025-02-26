// user page to create a new form, with save or submit options
import "./UserCreateFormPage.css";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormTemplate from "../../components/Form/FormTemplate.jsx";
import { use } from "react";
import Button from "../../components/Button";

const UserCreateFormPage = () => {
  const [formTypes, setFormTypes] = useState([]);
  const [formData, setFormData] = useState({});

  const [currentType, setCurrentType] = useState("PLEASE SELECT");
  const [dropDownText, setDropDownText] = useState("Dropdown button");

  //function - API stub to fetch available form types
  const getFormTypes = () => {
    //fetch form types from DB
    const form_types = [
      { name: "Graduation", id: "GR001" },
      { name: "Credit Petition", id: "TRN001" },
      { name: "Research Funds Approval", id: "RSF001" },
    ];
    setFormTypes(form_types);
    return;
  };

  const handleFormUpdate = (updatedData) => {
    setFormData(updatedData);
  };

  const handleTypeSelect = (eventKey) => {
    console.log(formTypes);
    let id_val = formTypes[eventKey].id;
    console.log(id_val);
    setCurrentType(id_val);
    setDropDownText(formTypes[eventKey].name);
  };

  //function - API stub to fetch needed form contents (or, store this from the form type call)
  const getFormContents = (formTypeId) => {
    //fetch form contents from DB
  };
  useEffect(() => {
    getFormTypes();
  }, []);
  //function - API stub for submitting form, sending data to DB backend

  const handleSubmitForm = () => {
    if (!isFormComplete()) {
      alert("Please complete all fields before submitting.");
      return;
    }
    //submit form into db
    alert(
      "Your form has been submitted!\n Form ID: " +
        currentType +
        localStorage.getItem("username") +
        Date.now()
    );
  };

  const handleSaveForm = () => {
    //save
    alert(
      "Your form has been saved for later!\n Form ID: " +
        currentType +
        localStorage.getItem("username") +
        Date.now()
    );
  };

  const isFormComplete = () => {
    if (!formData) return false;

    // Check applicant info
    const isApplicantInfoComplete = Object.values(formData.applicantInfo).every(
      (val) => val.trim() !== ""
    );

    // Check form content
    const isFormContentComplete = Object.values(
      formData.formContent.info
    ).every((val) => val.trim() !== "");

    // Check signatures
    const isSignaturesComplete = Object.values(formData.signatures.info).every(
      (sig) => sig.title.trim() !== ""
    );

    return (
      isApplicantInfoComplete && isFormContentComplete && isSignaturesComplete
    );
  };

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
          <DropdownButton
            id="dropdown-basic-button"
            title={dropDownText}
            onSelect={handleTypeSelect}
          >
            {
              /*  This maps each array item to a div adds
                the style declared above and return it */
              formTypes.map((item, index) => (
                <Dropdown.Item eventKey={index} key={index}>
                  {item.name} -- {item.id}
                </Dropdown.Item>
              ))
            }
          </DropdownButton>
          <span>Form ID: {currentType}</span>
        </div>
      </div>
      <p></p>
      <p>Form preview:</p>
      {/* display dynamic form component here */}
      <FormTemplate formTypeId={currentType} onFormUpdate={handleFormUpdate} />;
      {/* add "Save Form" button */}
      <br />
      <Button text="Save Form" onClick={handleSaveForm} />
      <br />
      <Button text="Submit" onClick={handleSubmitForm} />
      {/* add "Submit" button */}
    </div>
  );
};

export default UserCreateFormPage;
