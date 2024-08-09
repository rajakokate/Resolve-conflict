import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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
      alert('Form submitted. Thank you Open console for form Data')
      console.log(formData);
    } catch (error) {
      console.error("Error submitting form", error);
    }

  };

  if (!form) return <p>Loading...</p>

  return (
<div>
    <h1>{form.title}</h1>
    <form onSubmit={handleSubmit}>
        {form.inputs.map((input, index) => (
            <div key={index} style={{marginBottom: "10px"}}>
                <label>
                    {input.title}
                    <input
                    type={input.type}
                    name={input.title}
                    value={formData[input.title] || ""}   
                    placeholder={input.placeholder}
                    onChange = {handleChange}
                    required
                    />
                    
                </label>


            </div>
        ))}
        <button type="submit"> Submit</button>
    </form>
    <Link to="/">Go to dashboard</Link>
</div>
  )
};

export default ViewForm;