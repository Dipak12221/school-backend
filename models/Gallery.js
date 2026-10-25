const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Events", "Sports", "Academic", "Campus"],
      default: "Events",
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    mediaUrl: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Gallery", gallerySchema);
