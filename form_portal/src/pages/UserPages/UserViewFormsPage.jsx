// user page to view forms
import React from "react";
import { useState } from "react";
import Table from "../../components/Table";
import SearchComponent from "../../components/Search/SearchButton";
import TextInput from "../../components/Search/TextInput";
import DropdownInput from "../../components/Search/DropdownInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserViewFormsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  var data_created = [
    {
      id: 1,
      formTypeID: "GR001",
      type: "Student Graduation Form",
      status: "incomplete",
      actions: "edit",
    },
    {
      id: 2,
      formTypeID: "RSF001",
      type: "Faculty Research Form",
      status: "incomplete",
      actions: "edit",
    },
  ];

  var data_submitted = [
    {
      id: 1,
      formTypeID: "GR001",
      type: "Student Graduation Form",
      status: "completed",
      actions: "view",
    },
    {
      id: 2,
      formTypeID: "RSF001",
      type: "Faculty Research Form",
      status: "completed",
      actions: "view",
    },
  ];

  const handleSearch = async (searchCriteria) => {
    try {
      console.log(searchCriteria);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    { key: "id", title: "ID" },
    { key: "type", title: "Form Type" },
    { key: "status", title: "Form Status" },
    { key: "actions", title: "Actions" },
  ];

  const formTypes = [
    { value: "stuexample", label: "Student form example" },
    { value: "facexample", label: "Faculty form example" },
  ];

  const formStatuses = [
    { value: "complete", label: "Complete" },
    { value: "incomplete", label: "Incomplete" },
  ];

  data_created = data_created.map((entry) => {
    return {
      ...entry, // Copy the original object
      actions: (
        <button
          onClick={() =>
            navigate("/editform", {
              state: { id: entry.id, formID: entry.formTypeID },
              replace: false, // Ensure state persists
            })
          }
        >
          {entry.status === "completed" ? "View" : "Edit"}
        </button>
      ),
    };
  });

  data_submitted = data_submitted.map((entry) => {
    return {
      ...entry, // Copy the original object
      actions: (
        <button
          onClick={() =>
            navigate("/preview-form", {
              state: { id: entry.id, formID: entry.formTypeID },
              replace: false, // Ensure state persists
            })
          }
        >
          {entry.status === "completed" ? "View" : "Edit"}
        </button>
      ),
    };
  });

  return (
    <div className="main-page-content">
      <h1>View Forms</h1>
      <p>
        View, submit, and track the progress of your created forms. Search your
        forms using the fields below.
      </p>
      <div>
        <SearchComponent onSearch={handleSearch}>
          <DropdownInput
            name="type"
            options={formTypes}
            placeholder="Form Type"
          />
          <TextInput name="text" placeholder="Form ID" />
          <DropdownInput
            name="status"
            options={formStatuses}
            placeholder="Form Status"
          />
        </SearchComponent>
      </div>
      <Table data={data_created} columns={columns} caption="Created forms" />
      <Table
        data={data_submitted}
        columns={columns}
        caption="Submitted forms"
      />
    </div>
  );
}

export default UserViewFormsPage;
