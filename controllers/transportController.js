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
    const newRoute = new Transport(req.body);
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
    const updatedRoute = await Transport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
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
