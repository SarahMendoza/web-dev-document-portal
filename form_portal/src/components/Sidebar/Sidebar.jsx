import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { SidebarData } from "./SidebarData";

//import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    /*
    <div className="sidebar">
      <h4>Menu</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            Profile
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            Settings
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
  */
    <>
      <div>
        <div className="sidebar">
          <h4>Menu</h4>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars"></Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Routes>
          {SidebarData.map((item, index) => (
            <Route key={index} path={item.path} element={<item.component />} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default Sidebar;
