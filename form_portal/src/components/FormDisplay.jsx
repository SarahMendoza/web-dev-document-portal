import React from "react";
import PropTypes from "prop-types";
//import "./FormDisplay.css";

const FormDisplay = ({ form, editable = false, onFieldChange }) => {
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

  // helper to get signature entry for a template
  const getSignature = (tplId) => signatureList.find(s => s.signatureTemplate.id === tplId);

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
        <p><b>Signature: {owner.first_name} {owner.last_name}</b></p>
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
