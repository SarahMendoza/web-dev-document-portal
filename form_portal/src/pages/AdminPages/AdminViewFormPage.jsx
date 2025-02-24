// user page to view forms
import React from "react";
import Table from '../../components/Table';
import { Link } from "react-router-dom";


function AdminViewFormsPage(){
  const data = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Peter Jones', age: 40, city: 'Chicago' },
  ];

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'city', title: 'City' },
  ];

  return (
    <div className="main-page-content">
      <Table data={data} columns={columns} />
    </div>
  );
};

export default AdminViewFormsPage;
