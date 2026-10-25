const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  stopName: {
    type: String,
    required: [true, "Stop name is required"],
    trim: true,
  },
  fare: {
    type: Number,
    required: [true, "Fare is required for each stop"],
    min: [0, "Fare cannot be negative"],
  },
});

const transportSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: [true, "Route name is required"],
      trim: true,
    },
    busNumber: {
      type: String,
      required: [true, "Bus number is required"],
      trim: true,
    },
    vehicleNumber: {
      type: String,
      required: [true, "Vehicle registration number is required"],
      trim: true,
    },
    driverName: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
    },
    driverPhone: {
      type: String,
      required: [true, "Driver phone is required"],
      trim: true,
    },
    stops: {
      type: [stopSchema],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one stop with fare must be provided",
      },
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transport", transportSchema);
