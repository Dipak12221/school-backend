const express = require("express");
const router = express.Router();
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");
// const { protect, authorize } = require("../middleware/authMiddleware"); // Optional: agar auth laga rakha hai

// Agar Auth middleware use kar rahe hain toh router.get("/", protect, authorize("admin"), getSettings); aise likhein
router.get("/", getSettings);
router.put("/", updateSettings);

module.exports = router;
