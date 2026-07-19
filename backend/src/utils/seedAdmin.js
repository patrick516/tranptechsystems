// src/utils/seedAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const NAME = process.env.SEED_ADMIN_NAME || "Patrick";
const EMAIL = process.env.SEED_ADMIN_EMAIL || "info@tranptechsystems.com";
const PASSWORD = process.env.SEED_ADMIN_PASSWORD;

const run = async () => {
  if (!PASSWORD) {
    console.error("❌ Set SEED_ADMIN_PASSWORD before running this script.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  const existing = await Admin.findOne({ email: EMAIL });
  if (existing) {
    console.log(`  Admin with email ${EMAIL} already exists. Nothing created.`);
  } else {
    await Admin.create({ name: NAME, email: EMAIL, password: PASSWORD });
    console.log(`Admin created: ${EMAIL}`);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
