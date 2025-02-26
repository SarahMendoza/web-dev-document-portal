import React from "react";
import { useParams, useLocation } from "react-router-dom";
import FormTemplate from "../../components/Form/FormTemplate";
import Button from "../../components/Button";

const EditForm = (state) => {
  //const { id } = useParams(); // Get entry ID from URL
  //  const formTypeID = state.formID;
  const location = useLocation();
  //const id = location.state?.id;
  //const formID = location.state?.formID;
  const { id, formID } = location.state || {};

  console.log("Received:", id, formID); // Debugging output

  // Placeholder for entry data (fetch from API later)
  const entry = {
    id: 0,
    name: `Sample Form`,
    description: "Some details here...",
  };

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="main-page-content">
      <h1>Edit Form: {entry.name} </h1>
      <p>Edit or submit your created form</p>
      <FormTemplate formTypeId={formID} />
      <div
        style={{
          alignSelf: "center",
          marginRight: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></div>
      <br />
      <Button text="Save Form" onClick={handleClick} />
      <br />
      <Button text="Submit" onClick={handleClick} />
    </div>
  );
};

export default EditForm;
