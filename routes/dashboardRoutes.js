const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Dashboard stats route - Admin aur Teacher dono access kar sakte hain
router.get("/stats", protect, authorize("admin", "teacher"), getDashboardStats);

module.exports = router;
