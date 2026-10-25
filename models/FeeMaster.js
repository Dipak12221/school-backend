const mongoose = require("mongoose");

const feeMasterSchema = new mongoose.Schema(
  {
    annualFees: {
      newStudent: { type: Number, default: 1100 },
      existingStudent: { type: Number, default: 500 },
    },
    // Default class fees ko bilkul khali (empty object) rakha hai
    classFees: {
      type: Map,
      of: Number,
      default: {},
    },
    // Transport areas bhi shuru me khali rahenge, admin setup se add karega
    transportAreas: [
      {
        areaName: { type: String, required: true },
        fee: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("FeeMaster", feeMasterSchema);
