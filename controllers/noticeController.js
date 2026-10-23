const Notice = require("../models/Notice");

// 1. Get All Notices
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch notices", error: error.message });
  }
};

// 2. Add New Notice
exports.createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and Content are required." });
    }

    const newNotice = new Notice(req.body);
    const savedNotice = await newNotice.save();
    res.status(201).json(savedNotice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create notice", error: error.message });
  }
};

// 3. Update Notice
exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotice = await Notice.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found." });
    }
    res.status(200).json(updatedNotice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update notice", error: error.message });
  }
};

// 4. Delete Notice
exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found." });
    }
    res.status(200).json({ message: "Notice deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete notice", error: error.message });
  }
};
