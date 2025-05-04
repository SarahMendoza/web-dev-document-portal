import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import "./EditForm.css";

const EditForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {};

  const [fields, setFields] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formHeader, setFormHeader] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Missing form ID. Please navigate from the View Forms page.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // 1. Fetch the form instance
        const formRes = await axios.get(`http://localhost:8080/form/${id}`);
        const formData = formRes.data;
        setFields(formData.fieldList || []);

        // 2. Extract templateId from form id (prefix before dash)
        const templateId = formData.id.split('-')[0];

        // 3. Fetch the template details
        const tplRes = await axios.get(`http://localhost:8080/template/${templateId}`);
        const tplData = tplRes.data;
        setFormTitle(tplData.formTitle || '');
        setFormHeader(tplData.formHeader || '');
      } catch (err) {
        console.error("Failed to load form or template:", err);
        setError("Error loading form data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const updateFields = async () => {
    try {
      // Send the full field objects (id, fieldTemplate, data)
      const payload = fields.map(f => ({
        id: f.id,
        fieldTemplate: f.fieldTemplate,
        data: f.data

      }));
      await axios.post(`http://localhost:8080/form/update/${id}`, payload);
      
      
    } catch (err) {
      console.error("Error updating form:", err);
      const errMsg = err.response?.data?.message || err.message;
      alert(`Failed to update form: ${errMsg}`);
    }
  }

  const handleChange = (index, newValue) => {
    setFields(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], data: newValue };
      return updated;
    });
  };

  const handleSave = () => {
    updateFields();
    alert(`Form ${id} saved!`);
    navigate('/view-forms');
  };

  const handleSubmit = async () => {
    updateFields();
    try {
      await axios.post(`http://localhost:8080/form/submit`, id,  {headers: {
        "Content-Type": "text/plain"
      }});
      alert("Form successfully submitted!");
      navigate('/view-forms');
    }
   catch (err) {
    console.error("Error updating form:", err);
    const errMsg = err.response?.data?.message || err.message;
    alert(`Failed to update form: ${errMsg}`);
  }
    
  };

  if (isLoading) return <div>Loading form...</div>;
  if (error) return <div style={{ color: 'red', padding: '1rem' }}>{error}</div>;

  return (
    <div className="main-page-content">
      <h1>Edit Form: {formTitle}</h1>
      <p>{formHeader}</p>

      <div className="fields-section">
        <h4>Fields</h4>
        {fields.map((fieldObj, idx) => (
          <div key={fieldObj.id} className="field-row">
            <label htmlFor={`field-${fieldObj.id}`}>{fieldObj.fieldTemplate.fieldLabel}</label>
            <input
              id={`field-${fieldObj.id}`}
              type="text"
              value={fieldObj.data || ""}
              onChange={e => handleChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="signatures-section">
        <h4>Signatures</h4>
        {fields
          .filter(f => f.fieldTemplate.fieldLabel.toLowerCase().includes('signature'))
          .map(sig => (
            <div key={sig.id} className="signature-row">
              <span>{sig.fieldTemplate.fieldLabel}: {sig.data}</span>
            </div>
          ))}
      </div>

      <div className="actions">
        <Button text="Save Form" onClick={handleSave} />
        <Button text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditForm;
