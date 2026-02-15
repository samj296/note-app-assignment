const {Note} = require("../models/noteModel");

// Get /api/note -> return all notes

// with this method I don't have to expot at the end but I am more comfortable with other method
// exports.getAllnotes = async (req, res) => {
//     try {
//         const notes = await Note.find();
//         res.json(notes);
//     }catch (err){
        
//         res.status(500).json({ error: "Failed to fetch notes"});
//     };
// };

async function getAllnotes(req, res){
    try {
        const notes = await Note.find();
        res.json(notes);
    }catch (err){
        
        res.status(500).json({ error: "Failed to fetch notes"});
        /* 
            500 “Internal Server Error” – 
            This is a generic error that indicates the 
            server encountered an unexpected condition and 
            can’t fulfill the request. The server tells 
            you there is something wrong, but it is not sure what the problem is.
        */
    };
};

async function createNote(req, res){
    try{
        const {title, noteBody} = req.body;
        const newNote = noteBody ? {title, noteBody} : {title};
        const note = await Note.create(newNote);
        res.status(201).json(note);
    }catch(err){
        res.status(400).json({error: "Failed to create note"});
        /*
        - [400 “Bad Request”](https://www.siteground.com/kb/http-error-400/) – 
        The server can’t return a valid response due to an error from the client’s side. 
        Common causes are URLs with invalid syntax, deceptive request routing, large file size, etc.
        */
    };
};

async function updateNote(req, res){
    try{
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true}
        );

        /*
        const id = req.params.id;
        const updatedNote = Note.findByIdAndUpdate(id, req.body, {new: true}); 
        */
       if (!updatedNote){
            return res.status(404).json({error: "Note not found"});
            /*
            **404 “Not found”** – This is the most frequent error users see online.
            It means that the server can’t find the requested resource. Usually, 
            the cause is that the URL you’re trying to access doesn’t exist. 
            */
        }
        res.status(200).json(updatedNote);
    }catch(err){
        res.status(400).json({error: "Failed to create note"});
    };
};

async function deleteNote(req, res){
    try{
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id
        );

        if(!deletedNote){
            return res.status(404).json({error: "Note not found"})
        };
        res.status(200).json(deletedNote)
    }catch(err){
        res.status(400).json({error: "Failed to delete note"});
    };
};

module.exports = {getAllnotes, createNote, updateNote, deleteNote}