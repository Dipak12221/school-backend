const FeeMaster = require("../models/FeeMaster");

const getOrCreateMaster = async () => {
  let settings = await FeeMaster.findOne();
  if (!settings) {
    settings = await FeeMaster.create({
      annualFees: { newStudent: 1100, existingStudent: 500 },
      classFees: {}, // Shuru me koi default class nahi hogi
      transportAreas: [], // Shuru me koi area nahi hoga
    });
  }
  return settings;
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await getOrCreateMaster();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await getOrCreateMaster();
    if (req.body.annualFees) settings.annualFees = req.body.annualFees;
    if (req.body.classFees) settings.classFees = req.body.classFees;
    if (req.body.transportAreas)
      settings.transportAreas = req.body.transportAreas;

    await settings.save();
    res.status(200).json(settings);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update settings", error: error.message });
  }
};
