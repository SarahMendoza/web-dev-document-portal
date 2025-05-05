import React from "react";
import PropTypes from "prop-types";
//import "./FormTemplateDisplay.css";

const DEFAULT_CONTENT_LINK = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const FormTemplateDisplay = ({ formTemplate }) => {
  if (!formTemplate) {
    return <p>No form template provided.</p>;
  }

  const {
    formTemplateId,
    formTitle,
    formHeader,
    formContentLink,
  } = formTemplate;

  const pdfUrl = formContentLink || DEFAULT_CONTENT_LINK;

  return (
    <div className="form-template-container">
      <div className="form-header">
        <h2>{formTitle} <small>({formTemplateId})</small></h2>
        <p className="form-description">{formHeader}</p>
      </div>

      <div className="form-pdf">
        <iframe
          title={`Form ${formTemplateId}`}
          src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
          width="100%"
          height="600px"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

FormTemplateDisplay.propTypes = {
  formTemplate: PropTypes.shape({
    formTemplateId: PropTypes.string.isRequired,
    formTitle: PropTypes.string.isRequired,
    formHeader: PropTypes.string.isRequired,
    formContentLink: PropTypes.string,
  }),
};

export default FormTemplateDisplay;
