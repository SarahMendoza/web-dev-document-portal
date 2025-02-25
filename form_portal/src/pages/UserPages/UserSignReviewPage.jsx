// user page to create a new form, with save or submit options
import React from "react";
import Table from '../../components/Table'
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button"
import "../../components/Button.css"
import "../../components/Form/FormTemplate.css"
import FormTemplate from "../../components/Form/FormTemplate"

function UserSignReviewPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/user-sign-forms')
  };
  const handleClick = () => {
    alert('Button clicked!')
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="main-page-content" style={{ flex: '1' }}> 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1>Sign Form</h1>
            <p>Review the form and then enter your name to sign it.</p>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Button text="Back" onClick={goBack} variant="primary"/>
          </div>
        </div>
        <FormTemplate></FormTemplate>
      </div>
      <div style={{ alignSelf: 'center', marginRight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>Signature</p>
        <Button text="Sign" onClick={handleClick} variant="primary"/>
        <br></br>
        <Button text="Reject" onClick={handleClick} variant="secondary"/>
      </div>
    </div>
  );
};

export default UserSignReviewPage;
