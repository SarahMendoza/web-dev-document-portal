// user page to view forms
import React from "react";
import Table from '../../components/Table';

const UserViewFormsPage = () => {
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
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default UserViewFormsPage;
