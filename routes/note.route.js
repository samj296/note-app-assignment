const express = require("express");
const router = express.Router();
const {Note} = require("../models/note.model");

//Read aal the notes

router.get("/", async(req, res) => {
    try{
        const notes = await Note.find();
        res.json(notes)
    }catch(err){
        res.status(500).json({error: "Failed to fetch notes"});
    }
});

//create note
router.post("/", async(req, res) =>{
    try{
        const {title, noteBody} = req.body;
        const newNote = noteBody ? { title, noteBody} : {title};
        const note = await Note.create(newNote);
        res.status(201).json(note);
    }catch(err){
        res.status(400).json({ error: "Failed to create note" });
    };
});

router.patch("/:id", async(req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }   // this will give the updatedNote 
            // the new value else the old value will be assigned to the variable
            // res.json(updatedNote) will be sent the old value if {new:true} is not used
        );
        if(!updatedNote){
            return res.status(404).json({error: "Note not found"});
        };
        res.status(200).json(updatedNote);
    }catch(err){
        res.status(400).json({error: "Failed to update note"});
    };
});

router.delete("/:id", async(req, res) =>{
    try{
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id,
        );
        if(!deletedNote){
            return res.status(404).json({error: "Note not found"});
        };
        res.status(200).json(deletedNote)
    }catch(err){
        res.status(500).json({error: "Failed to delete the Id"})
    }
});

module.exports = router;

