const Book = require("../models/Book")
const Note = require("../models/Note");

exports.getAllBooks = async(req, res) => {
    try{
        const books = await Book.find({user: req.user._id})
            .populate("notes")
            .sort({createdAt: -1});
            res.json(books);
    }catch(err){
        console.log("error fetching books ", err);
        res.status(500).send("error fetching books");
    };
};

exports.getBookById = (req, res) => {
    res.json({message: `retrieving book by id ${req.params.id}`})
};

exports.addBook =async (req, res) => {
    const {name} = req.body;
    if(!name) return res.status(400).send("Book name is required");
    try{
        const book = await Book.create({
            name: name,
            user: req.user._id
        });
        res.status(201).json({
            message: "Book Created",
            book
        });
    }catch(err){
        console.log("Error creating book ", err);
        res.status(500).send("Error creating book");
    };
};

exports.updateBookById = (req, res) => {
    res.json({
        message: `Books updated by id ${req.params.id}`
    });
};

exports.deleteBookById = async(req, res) => {
    const id = req.params.id
    if (!id) return res.status(400).send("Book id required");
    try{
        const book = await Book.findOne({
            _id: id,
            user: req.user._id
        });

        if(!book) return res.status(404).send("Book not found");

        //Delete all notes inside this book
        await Note.deleteMany({
            _id: {$in: book.notes},
            user: req.user._id
        });

        //Delete the book
        await Book.findByIdandDelete(book._id);
        res.json({
            message: "Book and all its notes deleted"
        });

    }catch(err){
        console.log("Error deleting book ", err);
        res.status(500).send("Error deleting book");
    };
};