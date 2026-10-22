// Database connection aur ORM functionality ke liye Mongoose import karein
const mongoose = require("mongoose");

// .env file se environment variables load karne ke liye dotenv import karein
const dotenv = require("dotenv");

// Windows/Node.js DNS resolution issues ko fix karne ke liye DNS module import karein
const dns = require("dns");

// Operations ke liye User model import karein
const User = require("../models/User");

// DNS lookups ko IPv4 enforce karein aur Google Public DNS set karein
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// .env file ki variables load karein
dotenv.config();

const seedAdmin = async () => {
  try {
    // Database se connect karein
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding...");

    // Check karein ki Admin pehle se database me hai ya nahi
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin account already exists! Skipping creation.");
      process.exit(0);
    }

    // Strictly .env file se values pick karein (bina kisi default fallback ke)
    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Safety Check: Agar .env me Name, Email ya Password missing hai toh script cancel ho jayegi
    if (!adminName || !adminEmail || !adminPassword) {
      console.error(
        "Error: ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD is missing in the .env file!",
      );
      process.exit(1);
    }

    // Database me Admin Account create karein
    const adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log("Initial Admin Created Successfully!");
    console.log(`Email: ${adminUser.email}`);
    console.log("Credentials fetched securely from .env file.");

    process.exit(0);
  } catch (error) {
    console.error(`Error with Seeding Admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
