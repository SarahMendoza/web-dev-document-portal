import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userData from "./UserData";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userData.find((user) => user.username === username);
    if (user && user.password === password) {
      if (user.isAdmin) {
        //Change to admin home
        //!!!
        navigate("/user-home");
      } else {
        navigate("/user-home");
      }
      localStorage.setItem("userType", user.isAdmin);
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="main-page-content">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default LoginPage;
