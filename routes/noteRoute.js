const express = require("express")
const router = express.Router();
const noteController = require("../controllers/noteController");

//All notes
router.get("/", noteController.getAllNotes);

//One note by ID
router.get("/:id", noteController.getNoteById);

// edit note
router.put("/:id", noteController.updateNote);

// add note
router.post("/", noteController.createNote)

// delete note
router.delete("/:id", noteController.deleteNote)

module.exports = router;