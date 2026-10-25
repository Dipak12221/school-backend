const express = require("express");
const router = express.Router();
const {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Gallery list sabhi dekh sakte hain
router.get("/", protect, getAllGalleryItems);

// Add, Update, Delete sirf Admin kar sakta hai
router.post("/", protect, authorize("admin"), createGalleryItem);
router.put("/:id", protect, authorize("admin"), updateGalleryItem);
router.delete("/:id", protect, authorize("admin"), deleteGalleryItem);

module.exports = router;
