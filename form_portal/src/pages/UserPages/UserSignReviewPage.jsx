import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";
//import "./UserSignReviewPage.css";

const UserSignReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; // form ID

  const [formData, setFormData] = useState(null);
  const [signatureTemplate, setSignatureTemplate] = useState(null);
  const [signatureInput, setSignatureInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("No form selected. Please return to the forms list.");
      setLoading(false);
      return;
    }

    const username = localStorage.getItem("username");

    const fetchData = async () => {
      try {
        // 1. Fetch form contents
        const formRes = await axios.get(`http://localhost:8080/form/${id}`);
        setFormData(formRes.data);

        // 2. Fetch signature template for this user and form id (using POST to send raw body)
const sigRes = await axios.post(
  `http://localhost:8080/signature_template/${username}`,
  id,
  { headers: { "Content-Type": "text/plain" } }
);
setSignatureTemplate(sigRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load form or signature requirements.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const goBack = () => navigate('/user-sign-forms');

  const handleSign = async () => {
    if (!signatureInput.trim()) {
      alert("Please enter your signature before signing.");
      return;
    }
    const username = localStorage.getItem("username");
    try {
      const signRes = await axios.post(`http://localhost:8080/form/sign/`, {
        username,
        signature: signatureInput,
        signatureTemplateId: signatureTemplate.id,
        formId: id
      });
      if(signRes.data === true) { alert("Form signed successfully."); }
      else { alert("Form signed failed.");}
      navigate('/user-sign-forms');
    } catch (err) {
      console.error(err);
      alert("Error signing form.");
    }
  };

  const handleReject = async () => {
    const explanation = prompt("Please enter rejection explanation:");
    if (!explanation) return;

    const username = localStorage.getItem("username");
    try {
      await axios.post("http://localhost:8080/form/reject", {
        username,
        formId: id,
        rejectionExplanation: explanation,
      });
      alert("Form rejected.");
      navigate('/user-sign-forms');
    } catch (err) {
      console.error(err);
      alert("Error rejecting form.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="main-page-content user-sign-review">
      <div className="header">
        <h1>Review and Sign Form</h1>
        <Button text="Back" onClick={goBack} variant="secondary" />
      </div>

      <div className="form-preview">
        <h2>{formData.formTemplate.formTitle} ({formData.formTemplate.formTemplateId})</h2>
        <p>{formData.formTemplate.formHeader}</p>

        <div className="fields-section">
          {formData.fieldList.map(field => (
            <div key={field.id} className="field-row">
              <label>{field.fieldTemplate.fieldLabel}</label>
              <span>{field.data}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="signature-section">
        <h3>Signature Required</h3>
        <p>{signatureTemplate.title} (Level {signatureTemplate.userLevel})</p>
        <input
          type="text"
          placeholder="Enter your signature"
          value={signatureInput}
          onChange={e => setSignatureInput(e.target.value)}
        />
        <div className="actions">
          <Button text="Sign" onClick={handleSign} variant="primary" />
          <Button text="Reject" onClick={handleReject} variant="danger" />
        </div>
      </div>
    </div>
  );
};

export default UserSignReviewPage;
