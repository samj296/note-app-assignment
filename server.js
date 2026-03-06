const express = require("express");
const mongoose = require("mongoose");
const app = express();
const noteRoutes = require("./routes/noteRoute");
app.use(express.json());

const PORT = process.env.port;

const MONGODB_URI = process.env.MONGODB_URI;

//Routes
app.use("/notes", noteRoutes);

//MongoDB connection (the server will run only after the sucessful connection to the MongoDB)
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`App is running on http://localhost:${PORT}`);
        });
    })

    .catch((err) => {
        console.log("Mongo connection error ", err);
    })