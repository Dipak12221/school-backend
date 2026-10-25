const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Fee = require("../models/Fee");
const Activity = require("../models/Activity"); // Naya Model

exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments({ status: "Active" });
    const totalTeachers = await Teacher.countDocuments();
    const distinctClasses = await Student.distinct("class");
    const totalClasses = distinctClasses.length;

    // --- Current Month Pending Fee Logic ---
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = months[new Date().getMonth()]; // Jaise: "Oct"

    // 1. Jin raseedo me due amount bacha hai, unka total (Generated Dues)
    const pendingFeesResult = await Fee.aggregate([
      { $match: { dueAmount: { $gt: 0 } } },
      { $group: { _id: null, totalDue: { $sum: "$dueAmount" } } },
    ]);
    const pendingFees =
      pendingFeesResult.length > 0 ? pendingFeesResult[0].totalDue : 0;

    // 2. Kitne baccho ne is mahine ki fee bilkul nahi di hai?
    const studentsWithFeesThisMonth = await Fee.distinct("enrollment", {
      selectedMonths: currentMonth,
    });
    const unpaidStudentsCount =
      totalStudents - studentsWithFeesThisMonth.length;

    // --- Recent Activities Logic ---
    // Database se last 5 activities uthayenge
    const recentActivitiesDocs = await Activity.find()
      .sort({ date: -1 })
      .limit(5);
    let recentActivities = recentActivitiesDocs.map((a) => a.message);

    // Agar database khali hai to default message
    if (recentActivities.length === 0) {
      recentActivities = ["System initialized. No recent activities yet."];
    }

    res.status(200).json({
      totalStudents,
      totalTeachers,
      totalClasses,
      pendingFees,
      unpaidStudentsCount: unpaidStudentsCount > 0 ? unpaidStudentsCount : 0,
      recentActivities,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error: Unable to fetch dashboard stats",
      error: error.message,
    });
  }
};
