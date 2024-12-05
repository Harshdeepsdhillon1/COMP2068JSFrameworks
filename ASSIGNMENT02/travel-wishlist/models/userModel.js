const mongoose = require("mongoose");
const SchemaObj ={
    username: {type:String},
    password: {type:String},
}
const MongooseSchema = new mongoose.scheme