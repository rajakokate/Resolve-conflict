import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      <h1>Welcome to Form.com</h1>
      <p>This is a simple form builder.</p>
      <Link to="/form/create">Create new form</Link>
      <hr></hr>

      <div>
        <h1>Forms</h1>
        {forms.length === 0 ? (
          <p>You have no forms created yet</p>
        ) : (
          <ul>
            {forms.map((form) => (
              <li key={form._id}>
                <div>
                  <h2>{form.title}</h2>
                  <div>
                    <Link to={`/form/${form._id}`}>View</Link>
                    <Link to={`/form/${form._id}/edit`}>Edit</Link>
                    <button onClick={() => handleDelete(form._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
       
    </div>
  );
};

export default Home;
