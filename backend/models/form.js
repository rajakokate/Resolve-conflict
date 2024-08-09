const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, required: true }, // title of the form
  inputs: [
    {
      // array of input fields
      type: {
        type: String,
        enum: ["text", "email", "password", "number", "date"],
        required: true,
      }, // input type (e.g. text, email)
      title: { type: String, required: true }, // label for input field
      placeholder: String, // placeholder text for the input field
    },
  ],
});

module.exports = mongoose.model("Form", formSchema);
