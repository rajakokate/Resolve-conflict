const FormSubmission = require("../models/formsubmission");
const Form = require("../models/form");


// handle form submission
const submitForm = async (req, res) => {
  try {
    const { formId } = req.params;
    console.log(`Received formId: ${formId}`); // Log formId for debugging

    const formData = req.body;

    //Validate the form by ID
    const form = await Form.findById(formId);
    if (!form) {
        console.log("Form not found in databse")// log when form is not found
      return res.status(404).json({ error: "form not found" });
    }

    //create a new form submission
    const formSubmission = new FormSubmission({
      formId,
      responses: formData,
    });

    // save the form sumbmission to database
    await formSubmission.save();

    res.status(200).json({ message: "Form Submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitForm,
};
