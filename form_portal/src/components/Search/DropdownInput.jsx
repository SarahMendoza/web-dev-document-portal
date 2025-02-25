
import React from "react";

const DropdownInput = ({ name, options, onChange, placeholder="Placeholder" }) => {
    return (
      <select
        name={name}
        className="form-select mb-2"
        onChange={(e) => onChange(name, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };
  export default DropdownInput;
  