// user page to view forms
import React from "react";
import {useState} from "react";
import Table from '../../components/Table';
import SearchComponent from "../../components/Search/SearchButton";
import TextInput from "../../components/Search/TextInput";
import DropdownInput from "../../components/Search/DropdownInput";
import { Link } from "react-router-dom";


function UserViewFormsPage(){
  const [results, setResults] = useState([]);
  const data = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Peter Jones', age: 40, city: 'Chicago' },
  ];

  const handleSearch = async (searchCriteria) => {
    try {
      console.log(searchCriteria);
    }
    catch(error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'city', title: 'City' },
  ];

  const formTypes = [
    {value: "stuexample", label:"Student form example"},
    {value: "facexample", label:"Faculty form example"}
  ];

  const formStatuses = [
    {value: "complete", label:"Complete"},
    {value: "incomplete", label:"Incomplete"}
  ];

  return (
    <div className="main-page-content">
      <h1>View Forms</h1>
      <p>View, submit, and track the progress of your created forms. Search your forms using the fields below.</p>
      <div>
        <SearchComponent onSearch={handleSearch}>
        <DropdownInput
            name="type"
            options={formTypes}
            placeholder = "Form Type"
          />
          <TextInput name="text" placeholder="Form ID" />
          <DropdownInput
            name="status"
            options={formStatuses}
            placeholder = "Form Status"
          />
        </SearchComponent>
      </div>
      <Table data={data} columns={columns} caption="Created forms" />
      <Table data={data} columns={columns} caption="Submitted forms" />
    </div>
  );
};

export default UserViewFormsPage;
