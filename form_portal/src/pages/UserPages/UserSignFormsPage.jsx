// user page to create a new form, with save or submit options
import React from "react";
import Table from '../../components/Table'
import { Link } from "react-router-dom";


function UserSignFormsPage() {
  const data = [
    { id: 1, type: 'Graduation', creator: 'Greg Weinrich', actions: 'Review' },
    { id: 2, type: 'Graduation', creator: 'Sarah Mendoza', actions: 'Review' },
    { id: 3, type: 'Credit Petition', creator: 'Caleb Patton', actions: 'Review' },
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
