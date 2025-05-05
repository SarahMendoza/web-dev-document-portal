// user page to view forms
import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";

function AdminViewFormsPage() {
  const [data, setData] = useState([]);
  const [selectedForms, setSelectedForms] = useState([]);
  const [error, setError] = useState(null);

  const handleCheckboxChange = (id, isChecked) => {
    setSelectedForms((prev) =>
      isChecked ? [...prev, id] : prev.filter((formId) => formId !== id)
    );
  };

  const viewSelectedForm = async () => {
    if (selectedForms.length !== 1) {
      alert("Please select exactly one form to view.");
      return;
    }

    const id = selectedForms[0];
    try {
      const response = await axios.get(`http://localhost:8080/form/${id}`);
      alert(
        `Viewing Form:\n\nID: ${response.data.id}\nStatus: ${response.data.formStatus}`
      );
    } catch (err) {
      console.error("Error viewing form:", err);
      setError("Failed to load form details. Please try again.");
    }
  };

  const deleteSelectedForms = async () => {
    if (selectedForms.length === 0) {
      alert("Please select at least one form to delete.");
      return;
    }

    try {
      for (const id of selectedForms) {
        await axios.delete(`http://localhost:8080/form/delete/${id}`);
      }
      alert("Selected forms deleted successfully!");
      setSelectedForms([]);
      fetchForms(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting forms:", err);
      setError("Failed to delete selected forms. Please try again.");
    }
  };

  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/form/all");
      const formsWithCheckbox = response.data.map((form) => ({
        select: (
          <Checkbox
            onCheckedChange={(isChecked) =>
              handleCheckboxChange(form.id, isChecked)
            }
          />
        ),
        template: form.id.split("-")[0], // Extract the part before the first dash
        id: form.id,
        username: "", // Leave username blank
        status: form.formStatus,
      }));
      setData(formsWithCheckbox);
    } catch (err) {
      console.error("Error fetching forms:", err);
      setError("Failed to load forms. Please try again later.");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const columns = [
    { key: "select", title: "Select" },
    { key: "template", title: "Form Template" },
    { key: "id", title: "Form ID" },
    { key: "username", title: "Username" },
    { key: "status", title: "Status" },
  ];

  return (
    <div className="main-page-content">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "20px",
        }}
      >
        <Button
          text="View Selected"
          onClick={viewSelectedForm}
          variant="primary"
        />
        <Button
          text="Delete Selected"
          onClick={deleteSelectedForms}
          variant="danger"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table data={data} columns={columns} caption="Forms" />
    </div>
  );
}

export default AdminViewFormsPage;
