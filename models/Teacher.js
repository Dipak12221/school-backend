const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    qualification: { type: String },
    experience: { type: String },
    mobile: { type: String, required: true },
    photo: { type: String },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Teacher", teacherSchema);
