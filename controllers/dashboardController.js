const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Fee = require("../models/Fee");
const Activity = require("../models/Activity");
const MasterFee = require("../models/MasterFee"); // Aapka MasterFee model import kiya gaya hai

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Basic Stats
    const totalStudents = await Student.countDocuments({ status: "Active" });
    const totalTeachers = await Teacher.countDocuments();
    const distinctClasses = await Student.distinct("class");
    const totalClasses = distinctClasses.length;

    // --- REAL PENDING FEE LOGIC ---
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

    // 2. MasterFee se class-wise fees nikalna
    const masterFeeDoc = await MasterFee.findOne();
    let classFees = {};
    if (masterFeeDoc && masterFeeDoc.classFees) {
      // Handle both Map (Mongoose default for objects) and plain Objects
      classFees =
        masterFeeDoc.classFees instanceof Map
          ? Object.fromEntries(masterFeeDoc.classFees)
          : masterFeeDoc.classFees;
    }

    // 3. Un bacchon ki list nikalna jinhone is mahine ki fee de di hai
    const feesThisMonth = await Fee.find({ selectedMonths: currentMonth });
    const paidEnrollments = feesThisMonth.map((f) =>
      f.enrollment ? f.enrollment.toLowerCase() : "",
    );

    // 4. Baki bache (Unpaid) bacchon ki expected fee jodna
    const activeStudents = await Student.find({ status: "Active" });
    let totalCurrentMonthPending = 0;
    let unpaidStudentsCount = 0;

    activeStudents.forEach((student) => {
      // Agar bacche ka enrollment paid list me nahi hai
      if (!paidEnrollments.includes(student.enrollment?.toLowerCase())) {
        unpaidStudentsCount++;

        // Bacche ki class ki fee aur transport fee nikalna
        const cFee = classFees[student.class] || 0;
        const tFee = student.transportFee || 0;

        totalCurrentMonthPending += Number(cFee) + Number(tFee);
      }
    });

    // 5. Arrears Jodna (Kati hui raseedo ka bacha hua due amount)
    const arrearsResult = await Fee.aggregate([
      { $match: { dueAmount: { $gt: 0 } } },
      { $group: { _id: null, totalDue: { $sum: "$dueAmount" } } },
    ]);
    const arrears = arrearsResult.length > 0 ? arrearsResult[0].totalDue : 0;

    // FINAL PENDING FEES = (Is mahine ki na aayi hui total fee) + (Purana bacha hua due)
    const finalPendingFees = totalCurrentMonthPending + arrears;

    // --- Recent Activities Logic ---
    const recentActivitiesDocs = await Activity.find()
      .sort({ date: -1 })
      .limit(5);
    let recentActivities = recentActivitiesDocs.map((a) => a.message);

    if (recentActivities.length === 0) {
      recentActivities = ["System initialized. No recent activities yet."];
    }

    res.status(200).json({
      totalStudents,
      totalTeachers,
      totalClasses,
      pendingFees: finalPendingFees,
      unpaidStudentsCount: unpaidStudentsCount,
      recentActivities,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      message: "Server Error: Unable to fetch dashboard stats",
      error: error.message,
    });
  }
};
