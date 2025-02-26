import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropdownInput from "../../components/Search/DropdownInput";
import TextInput from "../../components/Search/TextInput";
import SearchComponent from "../../components/Search/SearchButton";
import Button from "../../components/Button";
import "../../components/Button.css";
import EnterComponent from "../../components/Search/EnterButton";

function AdminCreateUserPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userLevel: "",
        userEmail: "",
    });

    const navigate = useNavigate();

    // Handle form submit
    const handleClick = () => {
        const { firstName, lastName, userLevel, userEmail } = formData;
        if (firstName === "" || lastName === "" || userLevel === "" || userEmail === "") {
            alert("Please fill in all fields.");
            return;
        }
        console.log("Form Data:", formData);
        navigate('/admin-manage-users');
    };

    // Update form state when fields change
    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // User levels options for dropdown
    const userLevels = [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "admin", label: "Admin" },
    ];

    useEffect(() => {
        console.log("Updated formData:", formData); // Debugging updated formData
    }, [formData]);

    return (
        <div className="main-page-content">
            <h1>Add User</h1>
            <EnterComponent onSearch={handleClick} handleChange={handleChange} formData={formData}>
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
                <h4>User Level</h4>
                <DropdownInput
                    name="userLevel"
                    options={userLevels}
                    placeholder="User Level"
                    value={formData.userLevel}
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

export default AdminCreateUserPage;
