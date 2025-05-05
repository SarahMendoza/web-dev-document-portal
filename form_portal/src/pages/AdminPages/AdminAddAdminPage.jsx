import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropdownInput from "../../components/Search/DropdownInput";
import TextInput from "../../components/Search/TextInput";
import SearchComponent from "../../components/Search/SearchButton";
import Button from "../../components/Button";
import "../../components/Button.css";
import EnterComponent from "../../components/Search/EnterButton";

function AdminCreateAdminPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userLevel: "3",
    userEmail: "",
    userTitle: "Admin",
  });

  const navigate = useNavigate();

  // Handle form submit
  const handleClick = async () => {
    const { firstName, lastName, userLevel, userEmail, userTitle } = formData;
    if (
      firstName === "" ||
      lastName === "" ||
      userLevel === "" ||
      userEmail === "" ||
      userTitle === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const requestBody = {
      user: {
        username: userEmail.split("@")[0],
        first_name: firstName,
        last_name: lastName,
        user_level: userLevel === "admin" ? 3 : parseInt(userLevel, 10),
        is_admin: userLevel === "admin" ? 1 : 0,
        is_first_login: 1,
        title: userTitle,
        email: userEmail,
      },
      password: "password",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/user/create-user",
        requestBody
      );
      console.log("User created successfully:", response.data);
      alert("User created successfully!");
      navigate("/admin-manage-users");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
    navigate("/admin-manage-users");
  };

  // Update form state when fields change
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // User levels options for dropdown

  useEffect(() => {
    console.log("Updated formData:", formData); // Debugging updated formData
  }, [formData]);

  return (
    <div className="main-page-content">
      <h1>Add User</h1>
      <EnterComponent
        onSearch={handleClick}
        handleChange={handleChange}
        formData={formData}
      >
        <h4>First Name</h4>
        <TextInput
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
        />
        <h4>Last Name</h4>
        <TextInput
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
        />
        <h4>User Email</h4>
        <TextInput
          name="userEmail"
          placeholder="User Email"
          value={formData.userEmail}
        />
      </EnterComponent>
    </div>
  );
}

export default AdminCreateAdminPage;
