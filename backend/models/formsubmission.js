const { response } = require('express');
const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
        required: true,
    },
    responses: {
        type: Map, // store responses as key value pairs
        of: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('FormSubmission', formSubmissionSchema);

