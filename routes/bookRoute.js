const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// get all books
router.get("/", ensureLoggedIn, bookController.getAllBooks);

//get book by id
router.get("/:id", ensureLoggedIn, bookController.getBookById);

//create book
router.post("/", ensureLoggedIn, bookController.addBook);

// update book
router.put("/:id", ensureLoggedIn, bookController.updateBookById);

//delete book
router.delete("/:id", ensureLoggedIn, bookController.deleteBookById);

module.exports = router;