// user page to create a new form, with save or submit options
import React from "react";
import Table from '../../components/Table'
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import "../../components/Button.css"
import "../../components/Form/FormTemplate.css"
import FormTemplate from "../../components/Form/FormTemplate"
import FormDisplay from "../../components/FormTemplateDisplay.jsx";
import FormContents from "../../FormContents.jsx";

function UserFormPreview() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/view-forms')
  };
  const handleClick = () => {
    alert('Button clicked!')
  };
  const exampleFormData = new FormContents({
    title: "Example Form",
    type: "EX01",
    description: "This is an example form.",
    content:
      "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
    author: {
      level: 0,
      firstname: "John ",
      lastname: "Doe",
    },
    fields: [
      {
        name: "school",
        placeholder: "School here",
        label: "Please enter your educational institution.",
      },
    ],
    // maybe make a signature object later
    signatures: [
      {
        level: 3,
        title: "Dean",
        firstname: "Lana",
        lastname: "Rey",
        date: "1-1-1969",
        signed: false,
      },
    ],
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="main-page-content" style={{ flex: '1' }}> 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

        <FormDisplay formContents={exampleFormData} />

      <div style={{ alignSelf: 'center', marginRight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button text="Go Back" onClick={goBack} variant="primary"/>
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserFormPreview;
