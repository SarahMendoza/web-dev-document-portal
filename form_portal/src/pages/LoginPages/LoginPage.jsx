import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userData from "./UserData";
import UserContext from "../../GlobalUserContext";
import Button from "../../components/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    if(!username || !password) {
      setError("Enter a username and password");
    }
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const api_url = `http://localhost:8080/user/login-user/${username}`;
      
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain'
        },
        body: password, 
        credentials: 'include',
        cache: 'no-cache'
      });
      
      // handle invalid login credentials
      if (response.status === 400 || response.status === 401 || 
        response.status === 403 || response.status === 404 || response.status === 500) {
          setError("Invalid credentials. Please try again.");
          setIsLoading(false);
          return;
      }
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      
      const isAuthenticated = await response.json();
      
      if (isAuthenticated === true) {
        // Authentication successful
        const user_info = userData.find(user => user.username === username) || {
          username: username,
          isAdmin: 0, // Default non-admin
          level: 1,   // Default level
          name: username, // Default name if not found
          creation_date: new Date().toISOString().split('T')[0] // Today's date
        };
        
        // Set user context
        setUser({ user_info });
        
        // store user data in localStorage
        // still need to update this so that it uses the real user's data from the backend
        localStorage.setItem("username", username);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("userType", user_info.isAdmin);
        localStorage.setItem("userLevel", user_info.level);
        localStorage.setItem("creationDate", user_info.creation_date);
        localStorage.setItem("userFullName", user_info.name);
        
        
        if (user_info.isAdmin === 1) {
          navigate("/admin-home");
        } else {
          navigate("/user-home");
        }
      } else {
        // Authentication failed
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(`Login failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-page-content">
      <h1>Login</h1>
      <br />
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <Button 
          text={isLoading ? "Logging in..." : "Login"} 
          onClick={handleLogin}
          disabled={isLoading || !username || !password}
        />
      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default LoginPage;