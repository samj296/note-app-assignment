const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/userController");
const passport = require("../auth/passport");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

//------------------ unprotected route ----------------------

// rendering the signup page
router.get("/signup", usercontroller.getSignupPage);
// adding user
router.post("/signup", usercontroller.createUser);

// login route
router.post("/login", passport.authenticate("local"), (req, res) => {
    // if we reach here, login was successful
    res.redirect("/users/homepage");
});

router.get("/login", usercontroller.login)

//-----------------protected route -----------------------

// rendering the homePage
router.get("/homepage", ensureLoggedIn,usercontroller.getHomePage);

// get single user by id
router.get("/:id", ensureLoggedIn, usercontroller.getUserById);

//updating the User
router.put("/:id", ensureLoggedIn, usercontroller.updateUserById );

//deleting the user
router.delete("/", ensureLoggedIn, usercontroller.deleteUser);



module.exports = router;