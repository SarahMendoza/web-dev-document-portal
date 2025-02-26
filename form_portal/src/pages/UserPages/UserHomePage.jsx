<<<<<<< Updated upstream
import React, { useContext } from "react";
import "./UserHomePage.css";
import UserContext from "./../../context/AuthContext.jsx";

const UserHomePage = () => {
  const { user, login, logout } = useContext(UserContext);
  return (
    <div>
      <div className="about-container">
        <p>
          User info: {user.username} and {user.userLevel} and {user.isAdmin}
        </p>
        <h1>About Us</h1>
        <p>
          This will eventually be the User Home Page! For now it is a landing
          page or "about page" while we sort out the navigation and basic
          components.
=======
import React from "react";
import {useContext} from "react";
import "./UserHomePage.css";
import UserContext from "../../GlobalUserContext";
import Button from "../../components/Button.jsx";

const UserHomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="about-container">
        <h1>Welcome</h1>
        <p>
          Here, you can perform actions probably
>>>>>>> Stashed changes
        </p>
        <h2>Your Account</h2>
        <div className="profile-container">
          <div className="profile">
            <h3>{user.username}</h3>
            <p><img src={user.profilePicture} alt="pfp" className="rounded-circle" width="100"/></p>
          </div>
          <div className="profile-info">
            <h3>Name: {user.name}</h3>
            <h3>User Level: {user.level}</h3>
            <h3>Created on: {user.creation_date}</h3>
          </div>
          
        </div>
        <br></br>
        <Button text="Reset Password"/>

      </div>
    </div>
  );
};

export default UserHomePage;
