import React, { useState } from "react";

const SearchComponent = ({ onSearch, children }) => {
  const [searchCriteria, setSearchCriteria] = useState({});

  const handleChange = (name, value) => {
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(searchCriteria);
  };

  return (
    <div className="container">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          onChange: (name, value) => handleChange(name, value),
        })
      )}
      <button onClick={handleSearch} className="btn btn-primary mt-2">
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
