const express = require("express");
const router = express.Router();
const {
  getAllNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Notices ki list sabhi (Admin, Teacher, Student) dekh sakte hain
router.get("/", protect, getAllNotices);

// Add, Update, Delete sirf Admin kar sakta hai
router.post("/", protect, authorize("admin"), createNotice);
router.put("/:id", protect, authorize("admin"), updateNotice);
router.delete("/:id", protect, authorize("admin"), deleteNotice);

module.exports = router;
