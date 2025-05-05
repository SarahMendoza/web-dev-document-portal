import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../GlobalUserContext";
import Button from "../../components/Button";
//import "./SetPasswordPage.css";

const SetPasswordPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const username = localStorage.getItem("username");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[#\$%&!]/.test(pwd);
    return (
      pwd.length >= 6 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("Password must be at least 6 chars, with uppercase, lowercase, number, and special (#,$,%,&,!).");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/user/${username}/change_password`,
        newPassword,
        { headers: { "Content-Type": "text/plain" } }
      );
      alert("Password updated successfully.");
      // redirect based on user role
      if (user?.is_admin === 1) {
        navigate("/admin-home");
      } else {
        navigate("/user-home");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="main-page-content set-password-page">
      <h1>Set New Password</h1>
      <p>Account Username: {username}</p>
      <p>Password requirements:</p>
      <ul>
        <li>At least 6 characters</li>
        <li>One uppercase letter</li>
        <li>One lowercase letter</li>
        <li>One number</li>
        <li>One special character (#, $, %, &, !)</li>
      </ul>

      <form onSubmit={handleSetPassword} className="password-form">
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <Button text="Submit" onClick={handleSetPassword} disabled={!newPassword || !confirmPassword} />
      </form>
    </div>
  );
};

export default SetPasswordPage;
