import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Checkbox from "../../components/Checkbox";
import { useNavigate } from "react-router-dom";

const AdminViewTemplatePage = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all templates
  const fetchTemplates = async () => {
    try {
      const response = await axios.get("http://localhost:8080/template/all");
      const templatesWithCheckbox = response.data.map((template) => ({
        select: (
          <Checkbox
            onCheckedChange={(isChecked) =>
              handleCheckboxChange(template.formTemplateId, isChecked)
            }
          />
        ),
        ...template,
      }));
      setTemplates(templatesWithCheckbox);
    } catch (err) {
      console.error("Error fetching templates:", err);
      setError("Failed to load templates. Please try again later.");
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id, isChecked) => {
    setSelectedTemplates((prev) =>
      isChecked ? [...prev, id] : prev.filter((templateId) => templateId !== id)
    );
  };

  // Delete selected templates
  const deleteSelectedTemplates = async () => {
    if (selectedTemplates.length === 0) {
      alert("Please select at least one template to delete.");
      return;
    }

    try {
      for (const id of selectedTemplates) {
        await axios.delete(`http://localhost:8080/template/delete/${id}`);
      }
      alert("Selected templates deleted successfully!");
      setSelectedTemplates([]);
      fetchTemplates(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting templates:", err);
      setError("Failed to delete selected templates. Please try again.");
    }
  };

  // View selected template
  const viewSelectedTemplate = async () => {
    if (selectedTemplates.length !== 1) {
      alert("Please select exactly one template to view.");
      return;
    }

    const id = selectedTemplates[0];
    try {
      const response = await axios.get(`http://localhost:8080/template/${id}`);
      alert(
        `Viewing Template:\n\nID: ${response.data.formTemplateId}\nTitle: ${response.data.formTitle}`
      );
    } catch (err) {
      console.error("Error viewing template:", err);
      setError("Failed to load template details. Please try again.");
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const columns = [
    { key: "select", title: "Select" },
    { key: "formTemplateId", title: "Template ID" },
    { key: "formTitle", title: "Title" },
  ];

  return (
    <div className="main-page-content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>View Templates</h1>
        <Button
          text="Create Template"
          onClick={() => navigate("/admin-create-template")}
          variant="primary"
        />
      </div>
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
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
          onClick={viewSelectedTemplate}
          variant="primary"
        />
        <Button
          text="Delete Selected"
          onClick={deleteSelectedTemplates}
          variant="danger"
        />
      </div>
      <Table data={templates} columns={columns} caption="Form Templates" />
    </div>
  );
};

export default AdminViewTemplatePage;
