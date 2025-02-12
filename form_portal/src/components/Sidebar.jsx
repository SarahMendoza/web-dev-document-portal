import React from 'react';
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h4>Menu</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active">Home</a>
        </li>
        <li>
          <a href="#" className="nav-link">Profile</a>
        </li>
        <li>
          <a href="#" className="nav-link">Settings</a>
        </li>
        <li>
          <a href="#" className="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
