const MasterFee = require("../models/MasterFee");

// Get Master Fee Setup (Sirf ek hi record hota hai)
exports.getMasterSetup = async (req, res) => {
  try {
    let setup = await MasterFee.findOne();
    // Agar pehli baar run ho raha hai, toh default document bana do
    if (!setup) {
      setup = await MasterFee.create({});
    }
    res.status(200).json(setup);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch master fees", error: error.message });
  }
};

// Update Master Fee Setup
exports.updateMasterSetup = async (req, res) => {
  try {
    const { annualFees, classFees, transportFees } = req.body;
    let setup = await MasterFee.findOne();

    if (!setup) {
      setup = new MasterFee();
    }

    if (annualFees) setup.annualFees = annualFees;
    if (classFees) setup.classFees = classFees;
    if (transportFees) setup.transportFees = transportFees;

    const savedSetup = await setup.save();
    res.status(200).json(savedSetup);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update master fees", error: error.message });
  }
};
