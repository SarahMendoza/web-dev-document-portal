import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import FormTemplateDisplay from "../../components/FormTemplateDisplay";
import FormDisplay from "../../components/FormDisplay";
import "./EditForm.css";

const EditForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Missing form ID. Please navigate from the forms list.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/form/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load form data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      fieldList: prev.fieldList.map(f =>
        f.fieldTemplate.id === fieldId ? { ...f, data: value } : f
      ),
    }));
  };

  const handleSave = async () => {
    try {
      const payload = formData.fieldList.map(f => ({
        id: f.id,
        fieldTemplate: f.fieldTemplate,
        data: f.data,
      }));
      await axios.post(`http://localhost:8080/form/update/${id}`, payload);
      alert("Form saved successfully.");
      if(localStorage.getItem("userType"))
        navigate("/admin-view-forms")
      else
        navigate("/view-forms");
    } catch (err) {
      console.error(err);
      alert("Failed to save form.");
    }
  };

  const handleSubmit = async () => {
    await handleSave();
    try {
      await axios.post(
        `http://localhost:8080/form/submit`,
        id,
        { headers: { "Content-Type": "text/plain" } }
      );
      alert("Form submitted successfully.");
      if(localStorage.getItem("userType"))
        navigate("/admin-view-forms")
      else
        navigate("/view-forms");
    } catch (err) {
      console.error(err);
      alert("Failed to submit form.");
    }
  };

  if (loading) return <div>Loading form...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="main-page-content">
      {/* Display form template header and PDF */}
      <FormTemplateDisplay formTemplate={formData.formTemplate} />

      {/* Display form fields and signatures, editable */}
      <FormDisplay
        form={formData}
        editable={true}
        onFieldChange={handleFieldChange}
      />

      <div className="actions">
        <Button text="Save" onClick={handleSave} />
        <Button text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditForm;
