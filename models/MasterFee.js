const mongoose = require("mongoose");

const masterFeeSchema = new mongoose.Schema(
  {
    // Annual Rates
    annualFees: {
      newStudent: { type: Number, default: 1100 },
      existingStudent: { type: Number, default: 500 },
    },
    // Class wise rates (Key-Value map: e.g., "10-A": 2500)
    classFees: {
      type: Map,
      of: Number,
      default: {},
    },
    // Stop / Route rates
    transportFees: [
      {
        id: { type: Number, required: true },
        routeName: { type: String, required: true },
        fee: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("MasterFee", masterFeeSchema);
