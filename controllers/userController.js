const User = require("../models/User");
const Book = require("../models/Book");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");



exports.getUserById = (req, res) => {
    res.json({
        message: `retrieving user by id ${req.params.id}`
    });
};

exports.updateUserById = (req, res) => {
    res.json({
        message: `Updating user by id ${req.params.id}`
    });
};


exports.createUser = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).send("missing username or password")
    }

    // bycrypt: hash password immediately
    const passwordHash = await bcrypt.hash(password, 10); 

    try{
        await User.create({username, passwordHash});
        // ? this is a query parameter and below endpoint is with queryparameter
        return res.redirect("/users/login?signup=success");
        // res.redirect("/login");
    }catch(err){
        console.log("Signup error", err)
        return res.status(400).send("Unable to signup, check username and password");
    };
};


exports.getSignupPage = (req, res) => {
    res.render("signup");
};



exports.deleteUser =async(req, res) => {
    try{
        // find all books for the  requesting user
        const books = await Book.find({ user: req.user._id });

        // Collect all note IDs from all books
        const allNoteIds = books.flatMap(book => book.notes);

        // delete all notes
        await Note.deleteMany({_id: { $in: allNoteIds}});

        //delete the user
        await User.findByIdAndDelete(req.user._id);

        // redirecting to login page
        return res.redirect("/users/login");

    }catch(err){
        console.log("Error deleting account ", err);
        res.status(500).send("Error deleting account")
    };
};


exports.login = (req, res) => {
    const showMessage = req.query.signup === "success";
    res.render("login", {showMessage});
};

exports.getHomePage = async(req, res) => {
    const books = await Book.find({user: req.user._id});
    res.render("homepage",{
        username: req.user.username,
        books
    });
};