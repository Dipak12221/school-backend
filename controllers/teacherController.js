const Teacher = require("../models/Teacher");

// 1. Get All Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch teachers", error: error.message });
  }
};

// 2. Add New Teacher
exports.addTeacher = async (req, res) => {
  try {
    const { teacherId, name, subject, mobile } = req.body;

    // Validation
    if (!teacherId || !name || !subject || !mobile) {
      return res
        .status(400)
        .json({
          message: "Teacher ID, Name, Subject, and Mobile are required.",
        });
    }

    // Duplicate Check
    const existingTeacher = await Teacher.findOne({ teacherId });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ message: "Teacher with this ID already exists." });
    }

    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add teacher", error: error.message });
  }
};

// 3. Update Teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update teacher", error: error.message });
  }
};

// 4. Delete Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json({ message: "Teacher deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete teacher", error: error.message });
  }
};
