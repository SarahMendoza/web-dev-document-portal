import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHomePage.css";
import UserContext from "../../GlobalUserContext";
import Button from "../../components/Button.jsx";

const AdminHomePage = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>No user found</p>; // Handle null case

  const logOut = (e) => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="main-page-content">
      <div className="about-container">
        <h1>
          Welcome,{" "}
          {localStorage.getItem("firstName") +
            " " +
            localStorage.getItem("lastName")}
        </h1>
        <p>Here, you can perform actions probably</p>
        <h2>Your Account</h2>
        <div className="profile-container">
          <div className="profile">
            <p>
              <img
                src="/pfp.jpg"
                alt="pfp"
                className="rounded-circle"
                width="100"
              />
              <h3>{localStorage.getItem("username")}</h3>
            </p>
          </div>
          <div className="profile-info">
            <h3>
              Name:{" "}
              {localStorage.getItem("firstName") +
                " " +
                localStorage.getItem("lastName")}
            </h3>
            <h3>Username: {localStorage.getItem("username")}</h3>
            <h3>Title: {localStorage.getItem("title")}</h3>
            <h3>
              Created on:{" "}
              {Date(localStorage.getItem("creationDate")).toLocaleString()}
            </h3>
          </div>
        </div>
        <br></br>
        <Button
          text="Reset Password"
          onClick={() => navigate("/set-password")}
        />
        <br /> <br />
        <Button text="Log Out" onClick={logOut} />
        <br /> <br />
        {isLoading && <p>Loading data...</p>}
        {error && (
          <div
            className="error-container"
            style={{
              color: "red",
              margin: "15px 0",
              padding: "10px",
              backgroundColor: "#fff0f0",
              borderRadius: "5px",
            }}
          >
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}
        {apiData && (
          <div
            className="api-data-container"
            style={{
              marginTop: "20px",
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "5px",
              border: "1px solid #dee2e6",
            }}
          >
            <h3>Form Data:</h3>
            <pre
              style={{
                padding: "10px",
                borderRadius: "5px",
                overflow: "auto",
                maxHeight: "400px",
              }}
            >
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
