const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    enrollment: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    fatherAadhaarNo: { type: String },
    motherName: { type: String },
    motherAadhaarNo: { type: String },
    dob: { type: String },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    community: { type: String, default: "GEN" },
    aadhaarNo: { type: String }, // [Note: Aadhaar numbers are securely handled/redacted per privacy rules]
    class: { type: String, required: true },
    rollNo: { type: String },
    mobile: { type: String, required: true },
    secondaryMobile: { type: String },
    address: { type: String },
    correspondenceAddress: { type: String },
    sameAsResidential: { type: Boolean, default: false },
    studentType: { type: String, default: "New" },
    isTransport: { type: Boolean, default: false },
    routeId: { type: String },
    routeName: { type: String, default: "None" },
    transportFee: { type: Number, default: 0 },
    feeCategory: { type: String, default: "General" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    photo: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
