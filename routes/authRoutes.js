const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");
// authMiddleware se protect aur authorize dono ko import kiya
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// 1. PUBLIC ROUTES (Bina Login Ke Accessible)
// ==========================================

// User Login (Admin & Student dono yahan se login karenge)
router.post("/login", loginUser);

// ==========================================
// 2. PROTECTED ROUTES (Login & Role Required)
// ==========================================

// UPDATED: Ab register API open nahi hai.
// Pehle: router.post("/register", registerUser); (Isse koi bhi register kar sakta tha)
// Ab: 'protect' middleware check karega ki user logged-in hai ya nahi,
// aur 'authorize("admin")' check karega ki logged-in user ADMIN hai ya nahi.
router.post("/register", protect, authorize("admin"), registerUser);

// Logged-in User ki Profile Details view karne ke liye (Admin & Student dono)
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile loaded successfully!",
    user: req.user,
  });
});

module.exports = router;
