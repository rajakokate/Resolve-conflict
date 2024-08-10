import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/FormInput";

const CreateForm = () => {
  const [title, setTitle] = useState("Untitled Form");
  const [inputs, setInputs] = useState([]);
  const [visibleForm, setVisibleForm] = useState(null);
  const [showInputOptions, setShowInputOptions] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const navigate = useNavigate();

  const toggleInputOptions = () => {
    setShowInputOptions(!showInputOptions);
  };

  const addInput = (type) => {
    if (inputs.length < 20) {
      setInputs([...inputs, { type, title: "", placeholder: "" }]);
    }
  };

  const editButtonHandler = (index) => {
    setVisibleForm("edit-form-input");
    setEditingIndex(index);
    setCurrentTitle(inputs[index].title);
    setCurrentPlaceholder(inputs[index].placeholder);
  };

  const deleteInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCurrentTitleChange = (e) => {
    setCurrentTitle(e.target.value);
    if (editingIndex !== null) {
      const newInputs = [...inputs];
      newInputs[editingIndex] = {
        ...newInputs[editingIndex],
        title: e.target.value,
      };
      setInputs(newInputs);
    }
  };

  const handleCurrentPlaceholderChange = (e) => {
    setCurrentPlaceholder(e.target.value);
    if (editingIndex !== null) {
      const newInputs = [...inputs];
      newInputs[editingIndex] = {
        ...newInputs[editingIndex],
        placeholder: e.target.value,
      };
      setInputs(newInputs);
    }
  };

  const handleCreateForm = async () => {
    try {
      await axios.post("http://localhost:5000/api/form/create", {
        title,
        inputs,
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating form");
      alert("Failed to create form please try again");
    }
  };

  return (
    <div>
      <h1>Create New Form</h1>
      <div
        style={{ display: "flex", padding: "20px", border: "1px solid #ccc" }}
      >
        {/* Left Container */}
        <div
          style={{ flex: 1, padding: "10px", borderRight: "1px solid #ccc" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>{title}</h2>
            <button onClick={() => setVisibleForm("edit-form-title")}>
              Edit
            </button>
          </div>

          {inputs.map((input, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <FormInput
                type={input.type}
                value={input.title}
                placeholder={input.placeholder}
                readOnly={true}
                mode="create" // set mode to view for creting  form
              />
              <button onClick={() => editButtonHandler(index)}>Edit</button>
              <button onClick={() => deleteInput(index)}>Delete</button>
            </div>
          ))}

          <div>
            <button type="button" onClick={toggleInputOptions}>
              {showInputOptions ? "CLOSE ADD INPUT" : "ADD INPUT"}
            </button>
          </div>
          {showInputOptions && (
            <div style={{ marginTop: "10px" }}>
              <button type="button" onClick={() => addInput("text")}>
                Text
              </button>
              <button type="button" onClick={() => addInput("number")}>
                Number
              </button>
              <button type="button" onClick={() => addInput("email")}>
                Email
              </button>
              <button type="button" onClick={() => addInput("password")}>
                Password
              </button>
              <button type="button" onClick={() => addInput("date")}>
                Date
              </button>
            </div>
          )}
        </div>

        {/* Right Container */}
        <div style={{ flex: 1, padding: "10px" }}>
          <h2>Form Editor</h2>
          {visibleForm === "edit-form-title" && (
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
              />
            </label>
          )}

          {visibleForm === "edit-form-input" && (
            <div>
              <label>
                Title:
                <input
                  type="text"
                  value={currentTitle}
                  onChange={handleCurrentTitleChange}
                />
              </label>
              <br />
              <label>
                Placeholder:
                <input
                  type="text"
                  value={currentPlaceholder}
                  onChange={handleCurrentPlaceholderChange}
                />
              </label>
            </div>
          )}

          {visibleForm === null && "Select to see editor"}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCreateForm}
        style={{ marginTop: "20px" }}
      >
        Create Form
      </button>
    </div>
  );
};

export default CreateForm;
