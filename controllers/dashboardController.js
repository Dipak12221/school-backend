const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Fee = require("../models/Fee");

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Total Students Count
    const totalStudents = await Student.countDocuments();

    // 2. Total Teachers Count
    const totalTeachers = await Teacher.countDocuments();

    // 3. Unique Classes Count (Student data se nikalenge)
    const distinctClasses = await Student.distinct("class");
    const totalClasses = distinctClasses.length;

    // 4. Pending Fees Calculation
    // Fee model me jinki dueAmount 0 se zyada hai, unka sum nikalte hain
    const pendingFeesResult = await Fee.aggregate([
      { $match: { dueAmount: { $gt: 0 } } },
      { $group: { _id: null, totalDue: { $sum: "$dueAmount" } } },
    ]);
    const pendingFees =
      pendingFeesResult.length > 0 ? pendingFeesResult[0].totalDue : 0;

    // 5. Recent Activities (Optional: Filhal ke liye static array, baad me DB se la sakte hain)
    const recentActivities = [
      "School portal is running smoothly.",
      `Total ${totalStudents} students registered.`,
      `Pending fees detected: ₹${pendingFees}`,
    ];

    res.status(200).json({
      totalStudents,
      totalTeachers,
      totalClasses,
      pendingFees,
      recentActivities,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error: Unable to fetch dashboard stats",
      error: error.message,
    });
  }
};
