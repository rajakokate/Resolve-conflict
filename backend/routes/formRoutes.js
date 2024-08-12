const express = require("express");
const router = express.Router();
const FormController = require("../controllers/formController");
const FormSubmitController = require("../controllers/FormSubmitController");

// Route to get all forms
router.get("/forms", FormController.getAllForms);

// Route to create a new form
router.post("/form/create", FormController.createForm);

// Route to get a form by ID
router.get("/form/:id", FormController.getFormById);

// Route to update an existing form by ID
router.put("/form/:id/edit", FormController.updateFormById);

// Route to submit a form
router.post("/form/:formId/submit", FormSubmitController.submitForm); // Ensure you have this controller defined

// router to delete a form
router.delete('/form/:id', FormController.deleteFormById)


module.exports = router;
