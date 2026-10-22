const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  bulkDeleteStudents,
} = require("../controllers/studentController");

// 1. Apne middleware ko import karein
const { protect, authorize } = require("../middleware/authMiddleware");

// 2. Har route par middleware apply karein

// Sabhi students ki list dekhna (Admin aur Teachers dono allow ho sakte hain, isliye dono pass kiye hain)
router.get("/", protect, authorize("admin", "teacher"), getAllStudents);

// Naya student add karna (Sirf Admin)
router.post("/", protect, authorize("admin"), createStudent);

// Student ki details update karna (Sirf Admin)
router.put("/:id", protect, authorize("admin"), updateStudent);

// Ek student ko delete karna (Sirf Admin)
router.delete("/:id", protect, authorize("admin"), deleteStudent);

// Ek sath multiple students ko delete karna (Sirf Admin)
router.post("/bulk-delete", protect, authorize("admin"), bulkDeleteStudents);

module.exports = router;
