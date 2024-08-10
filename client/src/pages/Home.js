import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/forms")
      .then((response) => setForms(response.data))
      .catch((error) => console.error("Error fetching forms", error));
  }, []);

  //function to handle deleting a form
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/form/${id}`)
      .then(() => {
        setForms(forms.filter((form) => form._id !== id));
      })
      .catch((error) => console.error("Error deleting form:", error));
  };

  return (
    <div>
      <div className="header">
        <h1>Welcome to Form.com</h1>
        <p>This is a simple form builder.</p>
        <Link to="/form/create" className="btn btn-success">
          CREATE NEW FORM
        </Link>
      </div>
      <hr></hr>

      <h1 className="formHeading">Forms</h1>

      {forms.length === 0 ? (
        <p>You have no forms created yet</p>
      ) : (
        <div className="form-container">
          {forms.map((form) => (
            <div key={form._id} className="form-item">
              <div>
                <h2>{form.title}</h2>
                <div className="form-actions">
                  <Link
                    to={`/form/${form._id}`}
                    className="btn btn-outline-success"
                  >
                    VIEW
                  </Link>
                  <Link
                    to={`/form/${form._id}/edit`}
                    className="btn btn-outline-info"
                  >
                    EDIT
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(form._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
