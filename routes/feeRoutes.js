const express = require("express");
const router = express.Router();
const {
  getAllFees,
  createFee,
  updateFee,
  deleteFee,
} = require("../controllers/feeController");

// Naya Master Fee Controller import karein
const {
  getMasterSetup,
  updateMasterSetup,
} = require("../controllers/masterFeeController");

const { protect, authorize } = require("../middleware/authMiddleware");

// ==========================================
// MASTER FEE SETUP ROUTES (Isko upar rakhein)
// ==========================================
// Admin aur Teachers master setup dekh sakte hain (admission form aadi ke liye)
router.get(
  "/master-setup",
  protect,
  authorize("admin", "teacher"),
  getMasterSetup,
);

// Sirf Admin hi master fees (rates) update kar sakta hai
router.put("/master-setup", protect, authorize("admin"), updateMasterSetup);

// ==========================================
// REGULAR FEE TRANSACTIONS ROUTES
// ==========================================
// Admin aur Teachers fees dekh sakte hain
router.get("/", protect, authorize("admin", "teacher"), getAllFees);

// Add, Update, Delete sirf Admin kar sakta hai
router.post("/", protect, authorize("admin"), createFee);
router.put("/:id", protect, authorize("admin"), updateFee);
router.delete("/:id", protect, authorize("admin"), deleteFee);

module.exports = router;
