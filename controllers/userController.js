const User = require("../models/User");
const Book = require("../models/Book");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");

// I don't think I will need this endpoint for my app
// As no one is allowed to check or pull other users detail
exports.getAllUser = (req, res) => {
    res.json({
        message: "retrieving all user"
    });
};

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
        return res.send({message: "You are signed up", username})
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
    res.render("login");
};