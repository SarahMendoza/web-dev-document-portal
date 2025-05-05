import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import FormTemplateDisplay from "../../components/FormTemplateDisplay";
import FormDisplay from "../../components/FormDisplay";
//import "./UserFormPreview.css";

const UserFormPreview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {};

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No form ID provided. Please select a form.");
      setLoading(false);
      return;
    }
    const fetchForm = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/form/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load form preview.");
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const goBack = () => navigate('/view-forms');

  if (loading) return <div>Loading form preview...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="main-page-content user-form-preview">
      <div className="header">
        <h1>Form Preview</h1>
        <Button text="Back" onClick={goBack} variant="secondary" />
      </div>
      {/* Display template header and PDF */}
      <FormTemplateDisplay formTemplate={formData.formTemplate} />
      {/* Display form contents read-only */}
      <FormDisplay form={formData} editable={false} />
    </div>
  );
};

export default UserFormPreview;
