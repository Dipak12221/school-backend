const express = require("express");
const router = express.Router();
const {
  getAllFees,
  createFee,
  updateFee,
  deleteFee,
} = require("../controllers/feeController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Admin aur Teachers fees dekh sakte hain
router.get("/", protect, authorize("admin", "teacher"), getAllFees);

// Add, Update, Delete sirf Admin kar sakta hai
router.post("/", protect, authorize("admin"), createFee);
router.put("/:id", protect, authorize("admin"), updateFee);
router.delete("/:id", protect, authorize("admin"), deleteFee);

module.exports = router;
