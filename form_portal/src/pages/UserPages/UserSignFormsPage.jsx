import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import SearchComponent from "../../components/Search/SearchButton";
import TextInput from "../../components/Search/TextInput";
import DropdownInput from "../../components/Search/DropdownInput";
import Button from "../../components/Button";
import axios from "axios";

const UserSignFormsPage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);

  const [searchCriteria, setSearchCriteria] = useState({ type: "", text: "", status: "" });

  // Fetch available form templates
  const fetchTemplates = async () => {
    try {
      const res = await axios.get("http://localhost:8080/template/all");
      setTemplates(res.data);
    } catch (err) {
      console.error("Failed to load form templates", err);
    }
  };

  // Fetch signable forms for current user
  const fetchSignForms = async () => {
    try {
      const username = localStorage.getItem("username");
      const res = await axios.get(`http://localhost:8080/form/sign/list/${username}`);
      setForms(res.data);
      setFilteredForms(res.data);
    } catch (err) {
      console.error("Failed to load signable forms", err);
    }
  };

  useEffect(() => {
    fetchTemplates();
    fetchSignForms();
  }, []);

  // Handle search/filter
  const handleSearch = ({ type, text, status }) => {
    setSearchCriteria({ type, text, status });
    let filtered = [...forms];
    if (type) {
      filtered = filtered.filter(f => f.id.split('-')[0] === type);
    }
    if (text) {
      filtered = filtered.filter(f => f.id.toLowerCase().includes(text.toLowerCase()));
    }
    if (status) {
      filtered = filtered.filter(f => f.formStatus.toLowerCase() === status.toLowerCase());
    }
    setFilteredForms(filtered);
  };

  // Prepare options
  const formTypeOptions = templates.map(tp => ({ value: tp.formTemplateId, label: tp.formTitle }));
  const formStatusOptions = [
    { value: "IN_CIRCULATION", label: "In Circulation" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ];

  // Derive table data
  const tableData = filteredForms.map(f => {
    const templateId = f.id.split('-')[0];
    const tpl = templates.find(t => t.formTemplateId === templateId);
    const typeLabel = tpl ? tpl.formTitle : templateId;

    const first = f.fieldList.find(fl => fl.fieldTemplate.fieldLabel.toLowerCase().includes('firstname'))?.data || '';
    const last = f.fieldList.find(fl => fl.fieldTemplate.fieldLabel.toLowerCase().includes('lastname'))?.data || '';
    const creator = `${first} ${last}`.trim();

    return {
      id: f.id,
      type: typeLabel,
      creator,
      actions: (
        <Button
          text="Review"
          onClick={() => navigate('/user-review-sign', { state: { id: f.id, formID: templateId } })}
          variant="primary"
        />
      ),
    };
  });

  const columns = [
    { key: "id", title: "Form ID" },
    { key: "type", title: "Form Type" },
    { key: "creator", title: "Created By" },
    { key: "actions", title: "Actions" },
  ];

  return (
    <div className="main-page-content">
      <h1>Sign Forms</h1>
      <p>Review forms awaiting your signature. Use the filters to find forms.</p>

      <SearchComponent onSearch={handleSearch}>
        <DropdownInput name="type" options={formTypeOptions} placeholder="Form Type" />
        <TextInput name="text" placeholder="Form ID" />
        <DropdownInput name="status" options={formStatusOptions} placeholder="Form Status" />
      </SearchComponent>

      {filteredForms.length === 0 ? (
        <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
          There are no forms awaiting your signature at this time.
        </p>
      ) : (
        <Table data={tableData} columns={columns} caption="Forms to Sign" />
      )}
    </div>
  );
};

export default UserSignFormsPage;
