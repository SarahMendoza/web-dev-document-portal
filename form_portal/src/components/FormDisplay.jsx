import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
//import UserContext from "../../GlobalUserContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
//import "./FormDisplay.css";



const FormDisplay = ({ form, editable = false, onFieldChange }) => {
  const navigate = useNavigate();
  if (!form) return <p>No form data provided.</p>;

  const {
    id,
    owner,
    creationDate,
    formStatus,
    rejectionExplanation,
    fieldList,
    signatureList,
  } = form;

  const dateStr = new Date(creationDate).toLocaleString();

  const getSignature = (tplId) => signatureList.find(s => s.signatureTemplate.id === tplId);

  const canDelete = (localStorage.getItem("username") === owner.username || localStorage.getItem("userType") === 1);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;
    try {
      await axios.delete("http://localhost:8080/form", {
        data: id,
        headers: { "Content-Type": "text/plain" }
      });
      if(localStorage.getItem("userType") === 1) {navigate("/admin-home")}
      else {navigate("/view-forms")}
      alert("Form deleted.");

      // Optionally refresh or navigate
    } catch (err) {
      console.error("Error deleting form:", err);
      alert("Failed to delete form.");
    }
  };

  return (
    <div className="form-display-container">
      <div className="meta-section">
        <h3>Form ID: {id}</h3>
        <p>Owner: {owner.username} ({owner.first_name} {owner.last_name})</p>
        <p>Title: {owner.title}</p>
        <p>Level: {owner.user_level}</p>
        <p>Created On: {dateStr}</p>
        <p>Status: {formStatus.replace(/_/g, ' ')}</p>
        {formStatus === 'REJECTED' && (
          <p className="rejection">Rejection Reason: {rejectionExplanation}</p>
        )}
      </div>

      <div className="fields-section">
        <h4>Fields</h4>
        {fieldList.map((field) => (
          <div key={field.id} className="field-row">
            <label htmlFor={`field-${field.id}`}>{field.fieldTemplate.fieldLabel}</label>
            {editable ? (
              <input
                type="text"
                id={`field-${field.id}`}
                name={`field-${field.id}`}
                className="form-control mb-2"
                value={field.data}
                onChange={(e) => onFieldChange(field.fieldTemplate.id, e.target.value)}
              />
            ) : (
              <span className="field-data">{field.data}</span>
            )}
          </div>
        ))}
      </div>

      <div className="signatures-section">
        <h4>Signatures</h4>
        {form.formTemplate.signatureTemplateList.map((tpl) => {
          const sig = getSignature(tpl.id);
          return (
            <div key={tpl.id} className="signature-row">
              <label>{tpl.title} (Level {tpl.userLevel}):</label>
              {sig ? (
                <span className="sig-data">
                  {sig.user.first_name} {sig.user.last_name} on{' '}
                  {new Date(sig.updateDate).toLocaleString()}
                </span>
              ) : (
                <span className="sig-pending">Pending</span>
              )}
            </div>
          );
        })}
      </div>

      {canDelete && (
        <div className="delete-section">
          <Button text="Delete Form" onClick={handleDelete} variant="danger" />
        </div>
      )}
    </div>
  );
};

FormDisplay.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      title: PropTypes.string,
      user_level: PropTypes.number,
    }).isRequired,
    creationDate: PropTypes.string,
    formStatus: PropTypes.string,
    rejectionExplanation: PropTypes.string,
    fieldList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      fieldTemplate: PropTypes.shape({ id: PropTypes.number, fieldLabel: PropTypes.string }),
      data: PropTypes.string,
    })),
    signatureList: PropTypes.arrayOf(PropTypes.shape({
      signatureTemplate: PropTypes.shape({ id: PropTypes.number }),
      user: PropTypes.shape({ first_name: PropTypes.string, last_name: PropTypes.string }),
      updateDate: PropTypes.string,
    })),
    formTemplate: PropTypes.shape({
      signatureTemplateList: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  editable: PropTypes.bool,
  onFieldChange: PropTypes.func,
};

export default FormDisplay;
