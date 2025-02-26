// user page to view forms
import React from "react";
import Table from '../../components/Table';
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
//import { Checkbox } from '@/components/ui/checkbox';
import TextInput from "../../components/Search/TextInput";
import DropdownInput from "../../components/Search/DropdownInput";
import Button from "../../components/Button"
import "../../components/Button.css"


function AdminCreateUserPage(){
    const navigate = useNavigate();
    const handleClick = () => {
        alert('Button clicked!');
        navigate('/admin-manage-users')
    };
    const handleChange = () => {

    };

    const userLevels = [
        {value: "0", label:"0"},
        {value: "1", label:"1"},
        {value: "2", label:"2"},
        {value: "3", label:"3"},
        {value: "admin", label:"Admin"},
    ];

    return (
        <div className="main-page-content">
            <h1>Add User</h1>
            <h4>First Name</h4>
            <TextInput name="text" placeholder="First Name" />
            <h4>Last Name</h4>
            <TextInput name="text" placeholder="Last Name" />
            <h4>User Level</h4>
            <DropdownInput
                name="level"
                options={userLevels}
                placeholder = "User Level"
                onChange={handleChange}
            />
            <h4>User Email</h4>
            <TextInput name="text" placeholder="User Email" />
            <Button text="Submit" onClick={handleClick} variant="primary"/>
        </div>
    );
};

export default AdminCreateUserPage;
