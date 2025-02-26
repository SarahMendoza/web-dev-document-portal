import React from "react";

const EnterComponent = ({ onSearch, handleChange, formData, children }) => {
  const handleSearch = () => {
    onSearch(formData);
  };

  return (
    <div className="container">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onChange: handleChange, formData }) // Pass handleChange and formData to children
      )}
      <button onClick={handleSearch} className="btn btn-primary mt-2">
        Submit
      </button>
    </div>
  );
};

export default EnterComponent;
