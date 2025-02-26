import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { AdminSidebarData } from "./SidebarData";
import { userData } from "../../pages/LoginPages/UserData";

//import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current URL path

  const sidebarItems = localStorage.getItem("userType") == 1 ? AdminSidebarData : SidebarData;
  console.log("UserType: " + localStorage.getItem("userType"));
  return (
    <>
      <div>
        <div className="sidebar">
          <h4>Menu</h4>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars"></Link>
            </li>
            {
            sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index} className={`nav-item ${isActive ? "active" : ""}`}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Routes>
          {sidebarItems.map((item, index) => (
            <Route key={index} path={item.path} element={<item.component />} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default Sidebar;
