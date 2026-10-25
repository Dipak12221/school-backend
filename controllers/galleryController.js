const Gallery = require("../models/Gallery");

// 1. Get All Gallery Items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch gallery items", error: error.message });
  }
};

// 2. Add New Gallery Item
exports.createGalleryItem = async (req, res) => {
  try {
    const { title, mediaUrl } = req.body;
    if (!title || !mediaUrl) {
      return res
        .status(400)
        .json({ message: "Title and Media URL are required." });
    }

    const newItem = new Gallery(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create gallery item", error: error.message });
  }
};

// 3. Update Gallery Item
exports.updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Gallery.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem)
      return res.status(404).json({ message: "Item not found." });
    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update item", error: error.message });
  }
};

// 4. Delete Gallery Item
exports.deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Gallery.findByIdAndDelete(id);

    if (!deletedItem)
      return res.status(404).json({ message: "Item not found." });
    res.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete item", error: error.message });
  }
};
