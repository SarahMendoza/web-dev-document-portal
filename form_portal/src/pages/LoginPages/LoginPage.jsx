import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userData from "./UserData";
import UserContext from "../../GlobalUserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogin = (e) => {

    e.preventDefault();
    const user_info = userData.find(
      (user_info) => user_info.username === username
    );
    if (user_info && user_info.password === password) {
      setUser({
        user_info
      });
      if (user_info.isAdmin === 1) {
        // Change to admin home
        //!!!
        navigate("/admin-home");
        //navigate("/user-sign-forms");
      } else {
        navigate("/user-home");
      }
      localStorage.setItem("userType", user_info.isAdmin);
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
