const mongoose = require("mongoose");
const plm = require('passport-local-mongoose');
const SchemaObj ={
    username: {type:String},
    password: {type:String},
}
const mongooseSchema = new mongoose.Schema(SchemaObj);
mongooseSchema.plugin(plm);
module.exports= mongoose.model("User", mongooseSchema);