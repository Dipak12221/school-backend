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
    aadhaarNo: { type: String },

    // Academic Details
    class: { type: String, required: true },
    section: { type: String, required: true }, // Naya Field
    rollNo: { type: String },

    // Contact & Address
    mobile: { type: String, required: true },
    secondaryMobile: { type: String },
    address: { type: String },
    correspondenceAddress: { type: String },
    sameAsResidential: { type: Boolean, default: false },

    // Admission & Fees
    studentType: { type: String, default: "New" },
    feeCategory: { type: String, default: "General" },

    // Transport Details (Updated fields)
    isTransport: { type: Boolean, default: false },
    busId: { type: String },
    busName: { type: String },
    stopId: { type: String },
    stopName: { type: String },
    transportFee: { type: Number, default: 0 },

    // Meta
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    photo: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
