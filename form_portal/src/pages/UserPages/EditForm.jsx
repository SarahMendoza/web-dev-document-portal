import React from "react";
import { useParams, useLocation } from "react-router-dom";
import FormTemplate from "../../components/Form/FormTemplate";

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
    name: `Entry`,
    description: "Some details here...",
  };

  return (
    <div className="main-page-content">
      {/* <h2>Editing Entry {entry.id}</h2>
      <p>Name: {entry.name}</p>
      <p>Description: {entry.description}</p>
      */}
      <h2>
        Editing Entry {id} and {formID}
      </h2>
      <button>Save Changes</button>
      <h1>Heading</h1>
      <FormTemplate formTypeId={formID} />
    </div>
  );
};

export default EditForm;
