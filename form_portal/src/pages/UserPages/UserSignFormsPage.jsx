// user page to create a new form, with save or submit options
import React from "react";
import Table from '../../components/Table'
import { Link } from "react-router-dom";
import Button from "../../components/Button"
import "../../components/Button.css"

function UserSignFormsPage() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  const data = [
    { id: 1, type: 'Graduation', creator: 'Greg Weinrich', actions: <Button text="Review" onClick={handleClick} variant="primary"/>},
    { id: 2, type: 'Graduation', creator: 'Sarah Mendoza', actions: <Button text="Review" onClick={handleClick} variant="primary"/> },
    { id: 3, type: 'Credit Petition', creator: 'Caleb Patton', actions: <Button text="Review" onClick={handleClick} variant="primary"/> },
  ];

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'type', title: 'Form Type' },
    { key: 'creator', title: 'Created By' },
    { key: 'actions', title: 'Actions' },
  ];

  return (
    <div className="main-page-content">
      <Table data={data} columns={columns} />
    </div>
  );
};

export default UserSignFormsPage;
