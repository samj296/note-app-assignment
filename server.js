require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

//importing all the routes here
const noteRoute = require("./routes/noteRoute");
const staffRoute = require("./routes/staffRoute");


const app = express();


const PORT = process.env.port;
const MONGODB_URI = process.env.MONGODB_URI;

//using middleware here
app.use(express.json());

//imp middleware read in the data as form submission which is what passprt expects
app.use(express.urlencoded({extended: false}))

//note routes
app.use("/notes", noteRoute);
//staff routes
app.use("/staffs", staffRoute)


//------end of middleware----------

//MongoDB connection (the server will run only after the sucessful connection to the MongoDB)
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => {
            console.log(`App is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Mongo connection error ", err);
    });
        
    