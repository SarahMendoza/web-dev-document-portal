import React from "react";
import { useParams } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams(); // Get entry ID from URL

  // Placeholder for entry data (fetch from API later)
  const entry = { id, name: `Entry ${id}`, description: "Some details here..." };

  return (
    <div>
      <h2>Editing Entry {entry.id}</h2>
      <p>Name: {entry.name}</p>
      <p>Description: {entry.description}</p>
      <button>Save Changes</button>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      <h1>Hiiofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</h1>
      

    </div>
  );
};

export default EditForm;
