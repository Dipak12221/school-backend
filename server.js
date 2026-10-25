const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Mobile Hotspot DNS Fix (Google Public DNS)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Routes import karein
const authRoutes = require("./routes/authRoutes");
// NEW: Student routes file ko yahan import kiya gaya hai
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const feeRoutes = require("./routes/feeRoutes");

const app = express();

// Middleware
app.use(cors());

// NAYA UPDATE: Data limit ko 50mb tak badha dein
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
// NEW: Frontend se aane wali '/api/students' ki saari requests is route par jayengi
app.use("/api/students", studentRoutes);
// NEW: Teacher routes yahan add karein
app.use("/api/teachers", teacherRoutes);
// NEW: Notice routes yahan add karein
app.use("/api/notices", noticeRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/fees", feeRoutes);

// Sample Health Route
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running smoothly!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
