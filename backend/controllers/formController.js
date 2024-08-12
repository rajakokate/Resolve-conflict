const Form = require("../models/form");

// Get all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find(); // Retrieve all forms
    res.json(forms); // Send as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new form
const createForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;
    const newForm = new Form({ title, inputs });
    await newForm.save();
    res.json(newForm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing form by ID
const updateFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, inputs } = req.body;

    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, inputs },
      { new: true }
    );
    if (!updatedForm) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(updatedForm); // Send the updated form as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a form by ID
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(form); // Send the form as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a form by id
const deleteFormById  = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Form.findByIdAndDelete(id);
    if (!result) {
        return res.status(404).json({error: "Form Not found"});
    }
    res.status(200).json({message: "Form deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
  getAllForms,
  createForm,
  updateFormById,
  getFormById,
  deleteFormById
};
