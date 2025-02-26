
import React from "react";
import {useContext} from "react";
import "./UserHomePage.css";
import UserContext from "../../GlobalUserContext";
import Button from "../../components/Button.jsx";

const UserHomePage = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Loading user...</p>; // Avoid rendering before data loads

  if (!user) return <p>No user found</p>; // Handle null case
  return (
    <div>
      <div className="about-container">
        <h1>Welcome</h1>
        <p>
          Here, you can perform actions probably
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
