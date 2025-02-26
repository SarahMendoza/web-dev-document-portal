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
  var data = [
    { id: 1, type: "Student form example", status: "completed", actions: "edit"},
    { id: 2, type: "Faculty form example", status: "incomplete", actions: "edit"},
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
    { key: 'type', title: 'Form Type' },
    { key: 'status', title: 'Form Status' },
    { key: 'actions', title: 'Actions' },
  ];

  const formTypes = [
    {value: "stuexample", label:"Student form example"},
    {value: "facexample", label:"Faculty form example"}
  ];

  const formStatuses = [
    {value: "complete", label:"Complete"},
    {value: "incomplete", label:"Incomplete"}
  ];
  
  data = data.map(entry => {
    return {
      ...entry, // Copy the original object
      actions: <a href={`/editform/${entry.id}`}>Edit</a> // Use JSX
    };
  })
  

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
