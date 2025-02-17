// user page to create a new form, with save or submit options
import "./UserCreateFormPage.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FormTemplateData } from "../../components/Form/FormTemplateData";

const UserCreateFormPage = () => {
  //function - API stub to fetch available form types

  //function - API stub to fetch needed form contents (or, store this from the form type call)

  //function - API stub for submitting form, sending data to DB backend

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
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
      {/* add "Save Form" button */}
      {/* add "Submit" button */}
    </div>
  );
};

export default UserCreateFormPage;
