const Fee = require("../models/Fee");
const Activity = require("../models/Activity"); // Activity model import kiya gaya hai

// 1. Get All Fee Records
exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 });
    res.status(200).json(fees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch fee records", error: error.message });
  }
};

// 2. Collect New Fee
exports.createFee = async (req, res) => {
  try {
    const { receiptNo, enrollment, studentName, paidAmount } = req.body;
    if (!receiptNo || !enrollment || !studentName) {
      return res.status(400).json({ message: "Missing required fee details." });
    }

    const newFee = new Fee(req.body);
    const savedFee = await newFee.save();

    // Nayi Activity Record Karein
    const newActivity = new Activity({
      message: `Fee Collected: ₹${paidAmount || 0} from ${savedFee.studentName} (Receipt: ${savedFee.receiptNo})`,
    });
    await newActivity.save();

    res.status(201).json(savedFee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to collect fee", error: error.message });
  }
};

// 3. Update Fee Record
exports.updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFee = await Fee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFee)
      return res.status(404).json({ message: "Fee record not found." });

    // (Optional) Update hone par bhi activity record kar sakte hain
    const newActivity = new Activity({
      message: `Fee Record Updated: ${updatedFee.studentName} (Receipt: ${updatedFee.receiptNo})`,
    });
    await newActivity.save();

    res.status(200).json(updatedFee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update fee record", error: error.message });
  }
};

// 4. Delete Fee Record
exports.deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFee = await Fee.findByIdAndDelete(id);

    if (!deletedFee)
      return res.status(404).json({ message: "Fee record not found." });

    // Delete hone par Activity Record Karein
    const newActivity = new Activity({
      message: `Fee Record Deleted for ${deletedFee.studentName} (Receipt: ${deletedFee.receiptNo})`,
    });
    await newActivity.save();

    res.status(200).json({ message: "Fee record deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete fee record", error: error.message });
  }
};
