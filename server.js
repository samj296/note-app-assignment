require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("./auth/passport");
const ensureLoggedIn = require("./middleware/ensureLoggedIn");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

//importing all the routes here
const noteRoute = require("./routes/noteRoute");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute")

const app = express();

app.use((req, res, next) => {
    next();
});


app.set("view engine", "ejs");
app.use(express.static("public"));


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

//using middleware here
app.use(express.json());

//imp middleware read in the data as form submission which is what passprt expects
app.use(express.urlencoded({extended: false}))

app.use(
    session({
        secret: process.env.Session_Secret || "dev_secret_change_me",
        resave: false,
        saveUninitialized: false
    })
)

//after all the middleware we will use the passport
app.use(passport.initialize());
app.use(passport.session());




//note routes
app.use("/notes", noteRoute);

//user routes
app.use("/users", userRoute);
app.use("/books", bookRoute);


//error handler
app.use(errorHandler);

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
        
