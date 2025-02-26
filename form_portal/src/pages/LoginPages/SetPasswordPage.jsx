import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userData from "./UserData";
import UserContext from "../../GlobalUserContext";
import Button from "../../components/Button";

const SetPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user_info = userData.find(
      (user_info) => user_info.username === username
    );
    if (user_info && user_info.password === password) {
      setUser({
        user_info,
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

  const handleSetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("Password is invalid, please match the described format.");
      return;
    }
    localStorage.setItem("userPassword", confirmPassword);
    /*
    const user_info = userData.find(
      (user_info) => user_info.username === user.username
    );
    if (user_info && user_info.password === password) {
      setUser({
        user_info,
      });
      if (user_info.isAdmin === 1) {
        navigate("/admin-home");
      } else {
        navigate("/user-home");
      }
      localStorage.setItem("userType", user_info.isAdmin);
    } else {
      setError("Incorrect username or password");
    }
      */
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[#\$%&]/.test(password);
    return (
      password.length >= 6 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  return (
    <div className="main-page-content">
      <h1>Set Password</h1>
      <p>Account Username: {localStorage.getItem("username")}</p>
      <p>
        Password format:
        <ul>
          <li>At least 6 characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character (#, $, %, &)</li>
        </ul>
      </p>
      <p>Enter your new password below:</p>
      <form onSubmit={handleLogin}>
        <div>
          <label></label>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label></label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        <Button text="Submit" onClick={handleSetPassword} variant="primary" />
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default SetPasswordPage;
