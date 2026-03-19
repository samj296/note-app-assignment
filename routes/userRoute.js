const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/userController");
const passport = require("../auth/passport");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

//------------------ unprotected route ----------------------
// adding user
router.post("/signup", usercontroller.createUser);

// login route
router.post("/login", passport.authenticate("local"), (req, res) => {
    // if we reach here, login was successful
    // for now just the json responce later I will redirect to home page
    res.json({
        message: "Loggeed in successfuly",
        user: {username: req.user.username}
    });
});

router.get("/login", usercontroller.login)

//-----------------protected route -----------------------
//get all user list
router.get("/", ensureLoggedIn, usercontroller.getAllUser);

// get single user by id
router.get("/:id", ensureLoggedIn, usercontroller.getUserById);

//updating the User
router.put("/:id", ensureLoggedIn, usercontroller.updateUserById );

//deleting the user
router.delete("/", ensureLoggedIn, usercontroller.deleteUser);



module.exports = router;