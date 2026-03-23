const express = require("express")
const router = express.Router();
const noteController = require("../controllers/noteController");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

//All notes for specific book
// Usually get all notes/book doesn't need req.params.id but here req.params.id is for book
router.get("/book/:bookId", ensureLoggedIn, noteController.getAllNotes);

//One note by ID
router.get("/note/:id", ensureLoggedIn, noteController.getNoteById);

// update note
router.put("/note/:id", ensureLoggedIn, noteController.updateNote);

// add note
router.post("/note", ensureLoggedIn, noteController.createNote)

// delete note
router.delete("/note/:id", ensureLoggedIn, noteController.deleteNote)

module.exports = router;