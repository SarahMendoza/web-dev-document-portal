import "./UserCreateFormPage.css";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "../../components/Button";
import FormTemplateDisplay from "../../components/FormTemplateDisplay";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserCreateFormPage = () => {
  const [formTemplates, setFormTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTemplateId, setCurrentTemplateId] = useState("PLEASE SELECT");
  const [dropDownText, setDropDownText] = useState("Select Form Type");
  const [fieldValues, setFieldValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormTemplates();
  }, []);

  const fetchFormTemplates = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/template/all");
      setFormTemplates(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load form templates.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (key) => {
    const idx = Number(key);
    const tpl = formTemplates[idx];
    if (!tpl) return;
    setCurrentTemplateId(tpl.formTemplateId);
    setDropDownText(tpl.formTitle);
    fetchTemplateDetails(tpl.formTemplateId);
  };

  const fetchTemplateDetails = async (templateId) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/template/${templateId}`);
      const data = res.data;
      setSelectedTemplate(data);
      // init fields
      const init = {};
      data.fieldTemplateList.forEach(f => init[f.id] = "");
      setFieldValues(init);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load template details.");
      setSelectedTemplate(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (id, val) => {
    setFieldValues(prev => ({ ...prev, [id]: val }));
  };

  const isFormComplete = () => selectedTemplate && Object.values(fieldValues).every(v => v.trim() !== "");

  const handleSaveForm = async () => {
    if (!isFormComplete()) { alert("Complete all fields before saving."); return; }
    const username = localStorage.getItem("username");
    const body = Object.entries(fieldValues).map(([fid, data]) => ({ fieldTemplateId: Number(fid), form: null, data }));
    try {
      const res = await axios.post(`http://localhost:8080/form/new/${username}`, body);
      alert(`Form saved! ID: ${res.data.id}`);
      navigate("/view-forms");
    } catch (err) {
      console.error(err);
      alert("Error saving form.");
    }
  };

  const handleSubmitForm = async () => {
    if (!isFormComplete()) { alert("Complete all fields before submitting."); return; }
    const username = localStorage.getItem("username");
    const body = Object.entries(fieldValues).map(([fid, data]) => ({ fieldTemplateId: Number(fid), form: null, data }));
    try {
      // create
      const createRes = await axios.post(`http://localhost:8080/form/new/${username}`, body);
      const created = createRes.data;
      // publish
      await axios.post("http://localhost:8080/form/publish", created, { headers: { "Content-Type": "application/json" } });
      alert("Form published successfully!");
      navigate("/view-forms");
    } catch (err) {
      console.error(err);
      alert("Error publishing form.");
    }
  };

  return (
    <div className="main-page-content">
      <h2>Create Form</h2>
      <p>Select a form template and fill out required fields.</p>
      <div className="inline-container">
        {isLoading && !selectedTemplate ? <p>Loading...</p> : error && !selectedTemplate ? (
          <div className="error-message">{error}<button onClick={fetchFormTemplates}>Retry</button></div>
        ) : (
          <>
            <DropdownButton title={dropDownText} onSelect={handleTemplateSelect} id="dropdown-basic">
              {formTemplates.map((t, i) => <Dropdown.Item key={i} eventKey={i}>{t.formTitle} -- {t.formTemplateId}</Dropdown.Item>)}
            </DropdownButton>
            <span>Form ID: {currentTemplateId}</span>
          </>
        )}
      </div>

      {selectedTemplate && (
        <>
          <FormTemplateDisplay formTemplate={selectedTemplate} />
          <div className="fields-section">
            <h4>Fields</h4>
            {selectedTemplate.fieldTemplateList.map(f => (
              <div key={f.id} className="field-row">
                <label>{f.fieldLabel}</label>
                <input type="text" value={fieldValues[f.id]} onChange={e => handleFieldChange(f.id, e.target.value)} />
              </div>
            ))}
          </div>
          <div className="actions">
            <Button text="Save Form" onClick={handleSaveForm} disabled={!isFormComplete()} />
            <Button text="Submit Form" onClick={handleSubmitForm} disabled={!isFormComplete()} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserCreateFormPage;
