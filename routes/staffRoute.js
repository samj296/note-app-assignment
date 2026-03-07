const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

//get all staff list
router.get("/", staffController.getAllStaffs);

//get single staff by id
router.get("/:id", staffController.getStaffById);

//updating the staff
router.put("/:id", staffController.upateStaff);

// adding the staff
router.post("/", staffController.createStaff);

// delete staff
router.delete("/:id", staffController.deleteStaff)

module.exports = router;