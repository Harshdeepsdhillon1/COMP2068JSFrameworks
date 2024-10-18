const mongoose = require("mongoose");

// Define Schema object
const SchemaObj = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    interest: { type: String, required: true },
    message: { type: String, required: true },
};

// Create mongoose schema
const project = new mongoose.Schema(SchemaObj);

// Create and export mongoose model
module.exports = mongoose.model("contactusdata", project); // Use contactusdata here
