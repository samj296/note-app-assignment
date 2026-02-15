const express = require("express");
const router = express.Router();
const {Note} = require("../models/noteModel");
const noteController = require("../controllers/noteController")

//Read all the notes
router.get("/", noteController.getAllnotes);

//create note
router.post("/", noteController.createNote);

//update note
router.patch("/:id", noteController.updateNote);

//delete note
router.delete("/:id", noteController.deleteNote);

module.exports = router;

