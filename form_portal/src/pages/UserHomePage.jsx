import React from "react";

const UserHomePage = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        This is a simple about page created using React. You can add more
        information about your company or yourself here.
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
      </div>
    </div>
  );
};

export default UserHomePage;
