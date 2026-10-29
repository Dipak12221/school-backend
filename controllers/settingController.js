const Setting = require("../models/Setting");
const Activity = require("../models/Activity"); // Dashboard log ke liye

// Fetch Current Settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    // Agar database naya hai aur settings nahi hai, toh default create kar do
    if (!settings) {
      settings = await Setting.create({});
    }
    res.status(200).json(settings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch settings", error: error.message });
  }
};

// Update Settings
exports.updateSettings = async (req, res) => {
  try {
    // Upsert = True ka matlab hai agar document nahi mila toh naya bana dega
    const updatedSettings = await Setting.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    // Dashboard ke liye activity log
    await Activity.create({
      message: "System settings were updated by Admin.",
    });

    res.status(200).json(updatedSettings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update settings", error: error.message });
  }
};
