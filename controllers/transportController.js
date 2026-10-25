const Transport = require("../models/Transport");

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Transport.find().sort({ createdAt: -1 });
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.addRoute = async (req, res) => {
  try {
    const {
      routeName,
      busNumber,
      vehicleNumber,
      driverName,
      driverPhone,
      stops,
      status,
    } = req.body;

    // Stops array formatting ensure karein
    const formattedStops = Array.isArray(stops)
      ? stops.map((s) => ({
          stopName: s.stopName?.trim(),
          fare: Number(s.fare),
        }))
      : [];

    const newRoute = new Transport({
      routeName,
      busNumber,
      vehicleNumber,
      driverName,
      driverPhone,
      status: status || "Active",
      stops: formattedStops,
    });

    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add route", error: error.message });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Agar stops update ho rahe hain to proper structure ensure karein
    if (updateData.stops && Array.isArray(updateData.stops)) {
      updateData.stops = updateData.stops.map((s) => ({
        stopName: s.stopName?.trim(),
        fare: Number(s.fare),
      }));
    }

    const updatedRoute = await Transport.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedRoute)
      return res.status(404).json({ message: "Route not found" });

    res.status(200).json(updatedRoute);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update route", error: error.message });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await Transport.findByIdAndDelete(req.params.id);
    if (!deletedRoute)
      return res.status(404).json({ message: "Route not found" });

    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete route", error: error.message });
  }
};
