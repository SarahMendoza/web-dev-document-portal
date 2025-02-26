// user page to create a new form, with save or submit options
import "./UserCreateFormPage.css";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormTemplate from "../../components/Form/FormTemplate.jsx";
import { use } from "react";

const UserCreateFormPage = () => {
  const [formTypes, setFormTypes] = useState([]);
  const [formContents, setFormContents] = useState([]);
  const [currentType, setCurrentType] = useState("Dropdown button");

  //function - API stub to fetch available form types
  const getFormTypes = () => {
    //fetch form types from DB
    const form_types = [
      { name: "Graduation", id: "GR001" },
      { name: "Credit Petition", id: "" },
      { name: "Research Funds Approval", id: "RSF001" },
    ];
    setFormTypes(form_types);
    return;
  };

  const handleTypeSelect = (e) => {
    console.log(e.target.value);
    setCurrentType(e.target.value);
  };

  //function - API stub to fetch needed form contents (or, store this from the form type call)
  const getFormContents = (formTypeId) => {
    //fetch form contents from DB
  };
  useEffect(() => {
    getFormTypes();
  }, []);
  //function - API stub for submitting form, sending data to DB backend

  return (
    <div className="main-page-content">
      <h2>Create Form</h2>
      <p>{currentType}</p>
      <p>
        Fill out a new digital form by selecting from the options below. Make
        sure to add your required signees and complete all form contents.
      </p>
      <div>
        <p>Select form type:</p>
        <div className="inline-container">
          <DropdownButton
            id="dropdown-basic-button"
            title={currentType}
            value={currentType}
            onChange={handleTypeSelect}
          >
            {
              /*  This maps each array item to a div adds
                the style declared above and return it */
              formTypes.map((item, index) => (
                <Dropdown.Item key={index}>
                  {item.name} -- {index}
                </Dropdown.Item>
              ))
            }
          </DropdownButton>
          <span>Form ID: [insert form ID from state here]</span>
        </div>
      </div>

      <p></p>
      {/* add dropdown here (bootstrap + styling) */}
      <p>Add signees by name and position: </p>
      {/* add dropdown here (bootstrap + styling) */}
      <p>Form contents: </p>
      {/* add editable table here */}
      <p>Form preview:</p>
      {/* display dynamic form component here */}
      <FormTemplate formTypeId={currentType} />
      {/* add "Save Form" button */}
      {/* add "Submit" button */}
    </div>
  );
};

export default UserCreateFormPage;
