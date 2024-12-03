require("dotenv").config();

//Create Configuration
const configurations = {
    ConnectionString : {
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    }
}
//Export Configuration Obj
module.exports =configurations;