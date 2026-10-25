const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Fee = require("../models/Fee");
const Activity = require("../models/Activity");
const MasterFee = require("../models/MasterFee");

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
    const currentMonth = months[new Date().getMonth()];

    // 2. MasterFee se class-wise fees nikalna
    const masterFeeDoc = await MasterFee.findOne();
    let classFees = {};
    if (masterFeeDoc && masterFeeDoc.classFees) {
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
      if (!paidEnrollments.includes(student.enrollment?.toLowerCase())) {
        unpaidStudentsCount++;
        const cFee = classFees[student.class] || 0;
        const tFee = student.transportFee || 0;
        totalCurrentMonthPending += Number(cFee) + Number(tFee);
      }
    });

    // 5. Arrears Jodna (BUG FIXED 🔥)
    // Ab hum dueAmount nahi jodenge, hum Total Billed me se Total Paid minus karenge
    const arrearsResult = await Fee.aggregate([
      {
        $group: {
          _id: null,
          totalGross: { $sum: "$grossTotal" },
          totalPaid: { $sum: "$paidAmount" },
          totalDiscount: { $sum: "$discount" },
        },
      },
    ]);

    let arrears = 0;
    if (arrearsResult.length > 0) {
      const { totalGross, totalPaid, totalDiscount } = arrearsResult[0];
      arrears = Math.max(0, totalGross - totalPaid - totalDiscount);
    }

    // FINAL PENDING FEES = (Is mahine ki fee) + (Asli bacha hua Arrears)
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
