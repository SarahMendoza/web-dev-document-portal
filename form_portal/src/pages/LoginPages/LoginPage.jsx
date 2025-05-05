import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../GlobalUserContext";
import Button from "../../components/Button";
import axios from "axios";
//import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Enter a username and password");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      // Authenticate user credentials
      const loginRes = await axios.post(
        `http://localhost:8080/user/login-user/${username}`,
        password,
        { headers: { "Content-Type": "text/plain" } }
      );

      if (loginRes.status !== 200 || loginRes.data !== true) {
        setError("Invalid credentials. Please try again.");
        return;
      }

      // Fetch full user profile
      const profileRes = await axios.get(
        `http://localhost:8080/user/${username}`
      );
      const userInfo = profileRes.data;

      // Set user context and localStorage
      setUser(userInfo);
      localStorage.setItem("username", userInfo.username);
      localStorage.setItem("firstName", userInfo.first_name);
      localStorage.setItem("lastName", userInfo.last_name);
      localStorage.setItem("userLevel", userInfo.user_level);
      localStorage.setItem("userType", userInfo.is_admin);
      localStorage.setItem("email", userInfo.email);
      localStorage.setItem("title", userInfo.title);

      // Redirect based on admin flag
      if (userInfo.is_admin === 1) {
        navigate("/admin-home");
      } else {
        navigate("/user-home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-page-content login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <Button
          text={isLoading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          disabled={isLoading || !username || !password}
        />
      </form>
    </div>
  );
};

export default LoginPage;
