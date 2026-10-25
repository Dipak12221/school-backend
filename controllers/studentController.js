const Student = require("../models/Student");
const Activity = require("../models/Activity");

// 1. Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Server Error: Unable to fetch students",
      error: error.message,
    });
  }
};

// 2. Create / Add New Student (Admission)
exports.createStudent = async (req, res) => {
  try {
    // UPDATED: section is extracted and validated
    const { enrollment, name, class: studentClass, section, mobile } = req.body;

    // Basic validation
    if (!enrollment || !name || !studentClass || !section || !mobile) {
      return res.status(400).json({
        message:
          "Please fill all required fields (Enrollment, Name, Class, Section, Mobile).",
      });
    }

    // Check if enrollment already exists
    const existingStudent = await Student.findOne({ enrollment });
    if (existingStudent) {
      return res.status(400).json({
        message: "Student with this enrollment number already exists.",
      });
    }

    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    // Create a new activity log
    const newActivity = new Activity({
      message: `New student added: ${savedStudent.name}`,
    });
    await newActivity.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Server Error: Unable to create student",
      error: error.message,
    });
  }
};

// 3. Update Student Details
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Server Error: Unable to update student",
      error: error.message,
    });
  }
};

// 4. Delete Single Student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }
    // Create an activity log
    const newActivity = new Activity({
      message: `Student deleted: ${deletedStudent.name}`,
    });
    await newActivity.save();

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Server Error: Unable to delete student",
      error: error.message,
    });
  }
};

// 5. Bulk Delete Students
exports.bulkDeleteStudents = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "No student IDs provided for deletion." });
    }

    await Student.deleteMany({ _id: { $in: ids } });
    res
      .status(200)
      .json({ message: "Selected students deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Server Error: Unable to perform bulk delete",
      error: error.message,
    });
  }
};
