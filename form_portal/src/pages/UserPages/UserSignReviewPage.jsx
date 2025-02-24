// user page to create a new form, with save or submit options
import React from "react";
import Table from '../../components/Table'
import { Link } from "react-router-dom";
import Button from "../../components/Button"
import "../../components/Button.css"

function UserSignReviewPage() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="main-page-content">
        <Button text="Back" onClick={handleClick} variant="primary"/>
    </div>
  );
};

export default UserSignReviewPage;
