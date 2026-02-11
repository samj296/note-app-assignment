require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

async function connectionDB(){
    try{
        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
    }catch (err){
        console.error("Mongo connection error: ", err.message);
        process.exit(1); // stop the app if connection failed
    };
};

module.exports = {connectionDB};