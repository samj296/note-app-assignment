require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//importing all the routes here
const noteRoute = require("./routes/noteRoute");
const staffRoute = require("./routes/staffRoute");

app.use(express.json());

const PORT = process.env.port;

const MONGODB_URI = process.env.MONGODB_URI;

//note routes
app.use("/notes", noteRoute);

app.use("/staffs", staffRoute)

//MongoDB connection (the server will run only after the sucessful connection to the MongoDB)


        app.listen(PORT, () => {
            console.log(`App is running on http://localhost:${PORT}`);
        });
    