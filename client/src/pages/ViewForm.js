import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import "./ViewForm.css";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/form/${id}`)
      .then((response) => {
        setForm(response.data);
        const initialFormData = response.data.inputs.reduce((acc, input) => {
          acc[input.title] = "";
          return acc;
        }, {});
        setFormData(initialFormData);
      })
      .catch((error) => console.error("Error fetching form", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/form/${id}/submit`, formData);
      alert("Form submitted. Thank you! Open the console for form data.");
      console.log(formData);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="view-form-container">
      <h1>{form.title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input-grid">
          {form.inputs.map((input, index) => (
            <div key={index} className="form-input-container">
              <label>
                {input.title}
                <FormInput
                  type={input.type}
                  name={input.title}
                  value={formData[input.title] || ""}
                  placeholder={input.placeholder}
                  onChange={handleChange}
                  required
                  mode="view"
                  className="input-bottom-border"
                />
              </label>
            </div>
          ))}
        </div>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
      <Link className=" link-container " to="/">
        Go to dashboard
      </Link>
    </div>
  );
};

export default ViewForm;
