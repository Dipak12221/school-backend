const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["General", "Academic", "Exam", "Event"],
      default: "General",
    },
    audience: {
      type: String,
      enum: ["All", "Students", "Teachers"],
      default: "All",
    },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Draft", "Expired"],
      default: "Active",
    },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notice", noticeSchema);
