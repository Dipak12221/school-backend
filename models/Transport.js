const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    routeName: { type: String, required: true },
    busNumber: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    stops: { type: String, required: true },
    fare: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transport", transportSchema);
