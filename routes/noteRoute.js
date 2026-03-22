const express = require("express")
const router = express.Router();
const noteController = require("../controllers/noteController");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

//All notes for specific book
router.get("/", ensureLoggedIn, noteController.getAllNotes);

//One note by ID
router.get("/:id", ensureLoggedIn, noteController.getNoteById);

// update note
router.put("/:id", ensureLoggedIn, noteController.updateNote);

// add note
router.post("/", ensureLoggedIn, noteController.createNote)

// delete note
router.delete("/:id", ensureLoggedIn, noteController.deleteNote)

module.exports = router;