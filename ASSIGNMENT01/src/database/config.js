require("dotenv").config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const configurations = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB // Refer to the .env file
    }
};

console.log("MongoDB Connection String:", process.env.CONNECTION_STRING_MONGODB);

module.exports = configurations;
