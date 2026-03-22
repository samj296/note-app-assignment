const Book = require("../models/Book");
const Note = require("../models/Note");

// Getting all note for a specific book
exports.getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find({user: req.user._id, book: req.params.bookId})
        .sort({createdAt: -1});

        res.json({notes});
    }catch(err){
        console.log("error fecting notes ", err);
        res.status(500).send("error fetching notes");
    };
};

exports.getNoteById = async (req, res) => {
    //Initially I planned to get the note by ID, but this endpoint must validate note Id and User ID
    //Using findOne() to match the criteria while keeping the same route structure.
    try{
        const note = await Note.findOne({user: req.user._id, _id: req.params.id})
        res.json({note});
    }catch(err){
        console.log("error fetching note ", err);
        res.status(500).send("error fetching notes");
    }
    
};

exports.updateNote = async (req, res) => {
    try{
        const {title, body} = req.body;
        const _id = req.params.id;
        const user = req.user._id;
        // Note body can be empty.
        if(!title){
            return res.status(400).send("Title is required");
        };
        // if the key and the variables are same we can write in this manner
        const updatedNote = await Note.findOneAndUpdate(
            {
                _id,
                user
            },
            {
                title,
                body
            },
            {
                new: true
            }
        );
        if(!updatedNote){
            return res.status(404).send("Note not found");
        }

        res.status(200).json(updatedNote);

    }catch(err){
        console.log("Error updating Note ", err);
        res.status(500).send("Error updating note");
    };
    
    
};

exports.createNote = async (req, res) => {
    try{
        const {title, body} = req.body;
        if(!title) return res.status(400).send("Title can't be empty");
        const newNote = await Note.create({title, body});
        res.status(201).json(newNote);
    }catch(err){
        console.log("Error creating notes ", err);
        res.status(500).send("Error creating note");
    }
};

exports.deleteNote = async (req, res) => {
    try{
        const _id = req.params.id;
        const user = req.user._id;
        const deletedNote = await Note.findOneAndDelete({
            user,
            _id
        });
        if (!deletedNote) return res.status(404).send("Note not found");
        res.status(200).json(deletedNote);
    }catch(err){
        console.log("Error deleting the Note", err);
        res.status(500).send("Error deleting the note");
    };
    
};