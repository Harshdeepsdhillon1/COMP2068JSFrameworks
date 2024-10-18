const mongoose = require("mongoose");
// Define Schema object
const SchemaObj = {
    name: {type: String, required: true},
    email: {type: String, required: true},
    interest: {type: String, default: 'TO DO'},
    message: {type: String, default: 'TO DO'},
}
// Create mongoose schema
const mongooseSchema = new mongoose.Schema(SchemaObj);
// Create and export mongoose model
module.exports = mongoose.model("contactusdata", mongooseSchema);
