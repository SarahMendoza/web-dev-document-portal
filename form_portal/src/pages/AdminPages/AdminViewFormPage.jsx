import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import SearchComponent from "../../components/Search/SearchButton";
import TextInput from "../../components/Search/TextInput";
import DropdownInput from "../../components/Search/DropdownInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminViewFormPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({ type: "", text: "", status: "" });

  // Fetch available form templates for dropdown
  const fetchFormTemplates = async () => {
    try {
      const res = await axios.get("http://localhost:8080/template/all");
      setTemplates(res.data);
    } catch (err) {
      console.error("Failed to load form templates", err);
    }
  };

  // Fetch user forms
  const fetchUserForms = async () => {
    try {
      const username = localStorage.getItem("username");
      const res = await axios.get(`http://localhost:8080/form/all`);
      setForms(res.data);
      setFilteredForms(res.data);
    } catch (err) {
      console.error("Failed to load user forms", err);
    }
  };

  useEffect(() => {
    fetchFormTemplates();
    fetchUserForms();
  }, []);

  // Handle search/filter action
  const handleSearch = ({ type, text, status }) => {
    setSearchCriteria({ type, text, status });
    let filtered = [...forms];

    if (type) {
      filtered = filtered.filter((f) => {
        const templateId = f.id.split("-")[0];
        return templateId === type;
      });
    }
    if (text) {
      filtered = filtered.filter((f) => f.id.toLowerCase().includes(text.toLowerCase()));
    }
    if (status) {
      filtered = filtered.filter((f) => f.formStatus.toLowerCase() === status.toLowerCase());
    }

    setFilteredForms(filtered);
  };

  // Prepare dropdown options
  const formTypeOptions = templates.map((tpl) => ({
    value: tpl.formTemplateId,
    label: tpl.formTitle,
  }));

  const formStatusOptions = [
    { value: "IN_CIRCULATION", label: "In Circulation" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ];

  // Split into created vs submitted
  const createdForms = filteredForms.filter((f) => f.formStatus === "NOT_SUBMITTED");
  const submittedForms = filteredForms.filter((f) => f.formStatus !== "NOT_SUBMITTED");

  // Map to table data
  const mapToTableData = (list, isSubmitted) =>
    list.map((entry) => {
      const templateId = entry.id.split("-")[0];
      const tpl = templates.find((t) => t.formTemplateId === templateId);
      const typeLabel = tpl ? tpl.formTitle : templateId;
      return {
        id: entry.id,
        type: typeLabel,
        status:
          entry.formStatus === "IN_CIRCULATION"
            ? "In Circulation"
            : entry.formStatus.charAt(0).toUpperCase() + entry.formStatus.slice(1).toLowerCase(),
        actions: (
          <button
            onClick={() =>
              navigate(isSubmitted ? "/preview-form" : "/editform", {
                state: { id: entry.id, formID: templateId },
                replace: false,
              })
            }
          >
            {isSubmitted ? "View" : "Edit"}
          </button>
        ),
      };
    });

  const columns = [
    { key: "id", title: "Form ID" },
    { key: "type", title: "Form Type" },
    { key: "status", title: "Form Status" },
    { key: "actions", title: "Actions" },
  ];

  return (
    <div className="main-page-content">
      <h1>View Forms</h1>
      <p>
        View, submit, and track the progress of your created forms. Search your
        forms using the fields below.
      </p>

      <SearchComponent onSearch={handleSearch}>
        <DropdownInput
          name="type"
          options={formTypeOptions}
          placeholder="Form Type"
        />
        <TextInput name="text" placeholder="Form ID" />
        <DropdownInput
          name="status"
          options={formStatusOptions}
          placeholder="Form Status"
        />
      </SearchComponent>

      <Table
        data={mapToTableData(createdForms, false)}
        columns={columns}
        caption="Created Forms"
      />

      <Table
        data={mapToTableData(submittedForms, true)}
        columns={columns}
        caption="Submitted Forms"
      />
    </div>
  );
}

export default AdminViewFormPage;
