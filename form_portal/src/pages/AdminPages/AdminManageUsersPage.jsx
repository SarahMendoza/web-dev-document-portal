// user page to view forms
import React from "react";
import Table from '../../components/Table';
import { Link, useNavigate } from "react-router-dom";
import Checkbox from '../../components/Checkbox.jsx';
import Button from "../../components/Button"
import "../../components/Button.css"
import SearchComponent from "../../components/Search/SearchButton";
import TextInput from "../../components/Search/TextInput";

function AdminManageUsersPage(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/create-user')
    };

    const deleteClick = () => {
        alert('User Deleted')
    };

    const handleSearch = async (searchCriteria) => {
        try {
          console.log(searchCriteria);
        }
        catch(error) {
          console.error("Error:", error);
        }
    };

    // const [checked, setChecked] = useState(false);

    const handleChange = (value) => {
    //     setChecked(value);
    //     console.log('Checkbox is now:', value);
    };

    const data = [
        { check: <Checkbox onCheckedChange={handleChange}/>, id: '123', firstName: 'Greg', lastName: 'Weinrich' },
    ];

    const columns = [
        { key: 'check', title: 'Select' },
        { key: 'id', title: 'ID' },
        { key: 'firstName', title: 'First Name' },
        { key: 'lastName', title: 'Last Name' },
    ];

    return (
        <div className="main-page-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <SearchComponent onSearch={handleSearch}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <TextInput name="userID" placeholder="Search ID" />
                        <TextInput name="userName" placeholder="Search Name" />
                    </div>
                </SearchComponent>
                <Button text="Delete Selected User(s)" onClick={deleteClick} variant="primary"/>
                <Button text="Create User" onClick={handleClick} variant="primary"/>
            </div>
        <Table data={data} columns={columns} />
        </div>
    );
};

export default AdminManageUsersPage;
