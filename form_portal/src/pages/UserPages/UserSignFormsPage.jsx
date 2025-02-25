// user page to create a new form, with save or submit options
import React from "react";
import Table from '../../components/Table'
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import "../../components/Button.css"
import SearchComponent from "../../components/Search/SearchButton";
import TextInput from "../../components/Search/TextInput";
import DropdownInput from "../../components/Search/DropdownInput";

function UserSignFormsPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/user-review-sign')
  };

  const handleSearch = async (searchCriteria) => {
    try {
      console.log(searchCriteria);
    }
    catch(error) {
      console.error("Error:", error);
    }
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
      <Table data={data} columns={columns} />
    </div>
  );
};

export default UserSignFormsPage;
