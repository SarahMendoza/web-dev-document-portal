import React from "react";
//import '../style.scss';
import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-light bg-header shadow">
        <div className="nav-left">
          <img
            src="/logo192.png"
            alt="logo"
            width="100"
            height="100"
            className="navbar-brand"
          />
          <div className="nav-text">
            <h1>Form Portal Online</h1>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
