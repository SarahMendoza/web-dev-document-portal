import React, { useState, useContext } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import UserContext from "./../../context/AuthContext.jsx";

//import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current URL path
  const { user, login, logout } = useContext(UserContext);

  return (
    <>
      <div>
        <div className="sidebar">
          <h4>Menu</h4>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars"></Link>
            </li>
            {SidebarData.map((item, index) => {
              if (item.user_type === "User" && !user.isAdmin) {
                const isActive = location.pathname === item.path;
                return (
                  <li
                    key={index}
                    className={`nav-item ${isActive ? "active" : ""}`}
                  >
                    <Link to={item.path}>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              } else if (item.user_type === "Admin" && user.isAdmin) {
                const isActive = location.pathname === item.path;
                return (
                  <li
                    key={index}
                    className={`nav-item ${isActive ? "active" : ""}`}
                  >
                    <Link to={item.path}>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
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
