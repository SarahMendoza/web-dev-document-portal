import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/Checkbox.jsx";
import Button from "../../components/Button";
import "../../components/Button.css";
import SearchComponent from "../../components/Search/SearchButton";
import TextInput from "../../components/Search/TextInput";
import axios from "axios";

function AdminManageUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = () => {
    navigate("/create-user");
  };

  const handleClickAdmin = () => {
    navigate("/admin-create-admin");
  };

  const deleteClick = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one user to delete.");
      return;
    }

    try {
      for (const username of selectedUsers) {
        await axios.delete(`http://localhost:8080/user/${username}`);
      }
      alert("Selected users deleted successfully!");
      setSelectedUsers([]); // Clear the selected users
      fetchUsers(); // Refresh the user list after deletion
    } catch (err) {
      console.error("Error deleting users:", err);
      setError("Failed to delete selected users. Please try again.");
    }
  };

  const handleCheckboxChange = (username, isChecked) => {
    setSelectedUsers((prev) =>
      isChecked ? [...prev, username] : prev.filter((user) => user !== username)
    );
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/all");
      const usersWithCheckbox = response.data.map((user) => ({
        check: (
          <Checkbox
            onCheckedChange={(isChecked) =>
              handleCheckboxChange(user.username, isChecked)
            }
          />
        ),
        id: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        level: user.is_admin === 1 ? "Admin" : user.user_level, // Display "Admin" if the user is an admin
        title: user.title,
      }));
      setUsers(usersWithCheckbox);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { key: "check", title: "Select" },
    { key: "id", title: "Username" },
    { key: "firstName", title: "First Name" },
    { key: "lastName", title: "Last Name" },
    { key: "level", title: "Level" },
    { key: "title", title: "Title" },
  ];

  return (
    <div className="main-page-content">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1>Manage Users</h1>
        <Button
          text="Delete Selected User(s)"
          onClick={deleteClick}
          variant="primary"
        />
        <Button text="Create User" onClick={handleClick} variant="primary" />
        <Button
          text="Create Admin"
          onClick={handleClickAdmin}
          variant="primary"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table data={users} columns={columns} />
    </div>
  );
}

export default AdminManageUsersPage;
