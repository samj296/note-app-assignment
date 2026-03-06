const express = require("express")
const router = express.Router();
const noteController = require("../controllers/noteController");

//All notes
router.get("/", noteController.getAllNotes);


module.exports = router;