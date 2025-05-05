import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHomePage.css";
import UserContext from "../../GlobalUserContext";
import Button from "../../components/Button.jsx";

const UserHomePage = () => {
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

  const fetchApiData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Updated URL to the one you confirmed works in Postman
      const apiUrl = 'http://localhost:8080/form/all';
      console.log(`Attempting to fetch from: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          // Don't include Content-Type header for GET requests without a body
        },
        // Important for cookies/sessions if your API uses authentication
        credentials: 'include',
        // Prevent caching issues
        cache: 'no-cache',
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API response received:", data);
      setApiData(data);
    } catch (err) {
      console.error("API fetch error details:", err);
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-page-content">
      <div className="about-container">
        <h1>Welcome, {localStorage.getItem("userFullName")}</h1>
        <p>Here, you can perform actions probably</p>
        <h2>Your Account</h2>
        <div className="profile-container">
          <div className="profile">
            <h3>{localStorage.getItem("username")}</h3>
            <p>
              <img
                src={user.profilePicture}
                alt="pfp"
                className="rounded-circle"
                width="100"
              />
            </p>
          </div>
          <div className="profile-info">
            <h3>Name: {user.name}</h3>
            <h3>User Level: {localStorage.getItem("userLevel")}</h3>
            <h3>Created on: {user.creation_date}</h3>
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
          <div className="error-container" style={{ color: 'red', margin: '15px 0', padding: '10px', backgroundColor: '#fff0f0', borderRadius: '5px' }}>
            <h3>Error:</h3>
            <p>{error}</p>
            <p>
              Potential issues:
              <ul>
                <li>CORS policy might be blocking the request</li>
                <li>Your React app might be on a different origin than expected by the API</li>
                <li>The API might require authentication that Postman has but the browser doesn't</li>
              </ul>
            </p>
          </div>
        )}
        
        {apiData && (
          <div className="api-data-container" style={{ marginTop: '20px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', border: '1px solid #dee2e6' }}>
            <h3>Form Data:</h3>
            <pre style={{ 
              padding: '10px', 
              borderRadius: '5px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;