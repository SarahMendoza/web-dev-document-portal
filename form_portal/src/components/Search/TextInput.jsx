import React from "react";

const TextInput = ({ name, placeholder, onChange }) => {
    return (
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="form-control mb-2"
        onChange={(e) => onChange(name, e.target.value)}
      />
    );
  };
  export default TextInput;
  