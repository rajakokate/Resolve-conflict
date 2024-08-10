import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/FormInput";
import "./CreateForm.css";

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
      alert("Failed to create form please add inputs");
    }
  };    

  return (
    <div>
      <h1 className="header">Create New Form </h1>

      <div className="container">
        {/* Left Container */}
        <div
          style={{
            flex: 2,
            padding: "10px",
            borderRight: "1px solid #ccc",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="header-container">
            <h2 className="form-title">{title}</h2>
            <button
              className="btn btn-outline-info"
              onClick={() => setVisibleForm("edit-form-title")}
            >
              Edit
            </button>
          </div>

          <div className="input-items">
            {inputs.map((input, index) => (
              <div key={index} className="input-item">
                <FormInput
                  type={input.type}
                  value={input.title}
                  placeholder={input.placeholder}
                  readOnly={true}
                  mode="create"
                  className="input-bottom-border"
                />

                <div className="input-actions">
                  <button
                    className="btn btn-outline-info"
                    onClick={() => editButtonHandler(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteInput(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              type="button"
              className="btn btn-outline-info add-input-button"
              onClick={toggleInputOptions}
            >
              {showInputOptions ? "CLOSE ADD INPUT" : "ADD INPUT"}
            </button>
          </div>
          {showInputOptions && (
            <div className="input-option-container">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => addInput("text")}
              >
                Text
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => addInput("number")}
              >
                Number
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => addInput("email")}
              >
                Email
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => addInput("password")}
              >
                Password
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => addInput("date")}
              >
                Date
              </button>
            </div>
          )}
        </div>

        {/* Right Container */}
        <div className="right-container">
          <h2>Form Editor</h2>
          {visibleForm === "edit-form-title" && (
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                // placeholder="Title"
                required
                className="input-bottom-border"
              />
            </label>
          )}

          {visibleForm === "edit-form-input" && (
            <div className='form-container'>
              <label>
                Title:
                <input
                  type="text"
                  value={currentTitle}
                  onChange={handleCurrentTitleChange}
                  className="input-bottom-border"
                />
              </label>
              <br />
              <label>
                Placeholder:
                <input
                  type="text"
                  value={currentPlaceholder}
                  onChange={handleCurrentPlaceholderChange}
                  className="input-bottom-border"
                />
              </label>
            </div>
          )}

          {visibleForm === null && "Select to see editor"}
        </div>
      </div>

      <div className="center-button-container">
        <button
          type="button"
          onClick={handleCreateForm}
          className="btn btn-success create-form-button  "
        >
          Create Form
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
