const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  stopName: {
    type: String,
    required: [true, "Stop name is required"],
    trim: true,
  },
});

const transportSchema = new mongoose.Schema(
  {
    routeName: { type: String, required: true },
    busNumber: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    stops: {
      type: [stopSchema],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one stop must be provided",
      },
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transport", transportSchema);
