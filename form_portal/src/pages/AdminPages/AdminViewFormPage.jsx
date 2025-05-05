// user page to view forms
import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";

function AdminViewFormsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/form/all");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError("Failed to load forms. Please try again later.");
      }
    };

    fetchForms();
  }, []);

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
    { key: "city", title: "City" },
  ];

  return (
    <div className="main-page-content">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table data={data} columns={columns} />
    </div>
  );
}

export default AdminViewFormsPage;
