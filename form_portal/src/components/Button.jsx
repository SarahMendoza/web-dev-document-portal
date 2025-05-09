import React from "react";

import "./Button.css"; // Import the CSS file

const Button = ({ text, onClick, type = "button", variant = "primary" }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;