import React, { useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import "./AdminCreateTemplatePage.css";

const AdminCreateTemplatePage = () => {
  const [formTemplateId, setFormTemplateId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formHeader, setFormHeader] = useState("");
  const [signatureTemplateList, setSignatureTemplateList] = useState([
    { title: "", level: "" },
  ]);
  const [fieldTemplateList, setFieldTemplateList] = useState([
    { fieldLabel: "" },
  ]);
  const [error, setError] = useState("");

  const handleAddSignature = () => {
    setSignatureTemplateList([
      ...signatureTemplateList,
      { title: "", level: "" },
    ]);
  };

  const handleAddField = () => {
    setFieldTemplateList([...fieldTemplateList, { fieldLabel: "" }]);
  };

  const handleSignatureChange = (index, key, value) => {
    const updatedSignatures = [...signatureTemplateList];
    updatedSignatures[index][key] = value;
    setSignatureTemplateList(updatedSignatures);
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = [...fieldTemplateList];
    updatedFields[index].fieldLabel = value;
    setFieldTemplateList(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formTemplateId || !formTitle || !formHeader) {
      setError("Please fill in all required fields.");
      return;
    }

    const requestBody = {
      formTemplateId,
      formTitle,
      formHeader,
      signatureTemplateList: signatureTemplateList.map((sig) => ({
        title: sig.title,
        level: parseInt(sig.level, 10),
      })),
      fieldTemplateList: fieldTemplateList.map((field) => ({
        fieldLabel: field.fieldLabel,
      })),
    };

    try {
      await axios.post("http://localhost:8080/template", requestBody);
      alert("Template created successfully!");
      setFormTemplateId("");
      setFormTitle("");
      setFormHeader("");
      setSignatureTemplateList([{ title: "", level: "" }]);
      setFieldTemplateList([{ fieldLabel: "" }]);
      setError("");
    } catch (err) {
      console.error("Error creating template:", err);
      setError("Failed to create template. Please try again.");
    }
  };

  return (
    <div className="main-page-content">
      <h1>Create Template</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Form Template ID:</label>
          <input
            type="text"
            value={formTemplateId}
            onChange={(e) => setFormTemplateId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Form Title:</label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Form Header:</label>
          <textarea
            value={formHeader}
            onChange={(e) => setFormHeader(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Signatures</h3>
          {signatureTemplateList.map((sig, index) => (
            <div key={index}>
              <label>Title:</label>
              <input
                type="text"
                value={sig.title}
                onChange={(e) =>
                  handleSignatureChange(index, "title", e.target.value)
                }
                required
              />
              <label>Level:</label>
              <select
                value={sig.level}
                onChange={(e) =>
                  handleSignatureChange(index, "level", e.target.value)
                }
                required
              >
                <option value="">Select Level</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          ))}
          <Button text="Add Signature" onClick={handleAddSignature} />
        </div>
        <div>
          <h3>Fields</h3>
          {fieldTemplateList.map((field, index) => (
            <div key={index}>
              <label>Field Label:</label>
              <input
                type="text"
                value={field.fieldLabel}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <Button text="Add Field" onClick={handleAddField} />
        </div>
        <Button text="Submit Template" type="submit" variant="primary" />
      </form>
    </div>
  );
};

export default AdminCreateTemplatePage;
