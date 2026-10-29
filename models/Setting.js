const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    // 1. General Info
    schoolName: { type: String, default: "R.B.G. PUBLIC SCHOOL" },
    schoolCode: { type: String, default: "SCH-001" },
    email: { type: String, default: "admin@school.com" },
    phone: { type: String, default: "+91 9876543210" },
    academicSession: { type: String, default: "2025-2026" },
    address: { type: String, default: "Titra, Bihar" },
    website: { type: String, default: "" },
    logoUrl: { type: String, default: "" },

    // 2. Security & Auth (Passwords are handled in User model)
    enableTwoFactor: { type: Boolean, default: false },
    sessionTimeout: { type: String, default: "30" },

    // 3. Notifications
    emailAlerts: { type: Boolean, default: true },
    smsAlerts: { type: Boolean, default: true },
    whatsappAlerts: { type: Boolean, default: false },
    feeReminders: { type: Boolean, default: true },
    examNotifications: { type: Boolean, default: true },
    attendanceAlerts: { type: Boolean, default: true },

    // 4. Academic Setup
    passPercentage: { type: String, default: "33" },
    gradingSystem: { type: String, default: "CBSE Standard (A+ to E)" },
    currentTerm: { type: String, default: "Annual Term" },
    resultPublishStatus: { type: String, default: "Draft Mode" },

    // 5. Payment Gateway
    currency: { type: String, default: "INR (₹)" },
    receiptPrefix: { type: String, default: "REC-" },
    merchantId: { type: String, default: "" },
    gatewayStatus: { type: String, default: "Disabled" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Setting", settingSchema);
