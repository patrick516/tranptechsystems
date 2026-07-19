// src/models/SiteSettings.js
const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    contactEmail: { type: String, trim: true, default: "" },
    contactPhone: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    socials: {
      linkedin: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
      twitter: { type: String, trim: true, default: "" },
      facebook: { type: String, trim: true, default: "" },
    },
    bankDetails: {
      bankName: { type: String, trim: true, default: "" },
      accountName: { type: String, trim: true, default: "" },
      accountNumber: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
