const express = require("express");
const router = express.Router();
const {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Routes
// Teachers ki list koi bhi logged-in admin ya teacher dekh sakta hai
router.get("/", protect, authorize("admin", "teacher"), getAllTeachers);

// Naya teacher add, update ya delete sirf Admin kar sakta hai
router.post("/", protect, authorize("admin"), addTeacher);
router.put("/:id", protect, authorize("admin"), updateTeacher);
router.delete("/:id", protect, authorize("admin"), deleteTeacher);

module.exports = router;
