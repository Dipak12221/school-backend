const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    receiptNo: { type: String, required: true, unique: true },
    enrollment: { type: String, required: true },
    studentName: { type: String, required: true },
    className: { type: String, required: true },
    studentType: { type: String, default: "Existing" },
    monthlyFee: { type: Number, default: 0 },
    isTransportOpted: { type: Boolean, default: false },
    selectedRouteId: { type: String },
    transportFee: { type: Number, default: 0 },
    paidMonths: { type: [String], default: [] },
    selectedMonths: { type: [String], default: [] },
    includeAnnual: { type: Boolean, default: false },
    annualFee: { type: Number, default: 0 },
    includeExam: { type: Boolean, default: false },
    examFee: { type: Number, default: 0 },
    previousDues: { type: Number, default: 0 },
    grossTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalFee: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Paid", "Partial", "Unpaid"],
      required: true,
    },
    paymentDate: { type: String, required: true },
    paymentMode: { type: String, default: "Cash" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Fee", feeSchema);
