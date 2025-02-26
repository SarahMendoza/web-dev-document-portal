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
        </p>
        <p>
          We can also use this page to test components while putting them
          together.
        </p>
        <h2>Our Mission</h2>
        <p>Explain the mission.</p>
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Team Member 1</h3>
            <p>Short bio of team member 1.</p>
          </div>
          <div className="team-member">
            <h3>Team Member 2</h3>
            <p>Short bio of team member 2.</p>
          </div>
          <div className="team-member">
            <h3>Team Member 3</h3>
            <p>Short bio of team member 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
