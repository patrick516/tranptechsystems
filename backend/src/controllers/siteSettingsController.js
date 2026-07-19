// src/controllers/siteSettingsController.js
const asyncHandler = require("../utils/asyncHandler");
const SiteSettings = require("../models/SiteSettings");

// Ensures a single settings document always exists
const getOrCreateSettings = async () => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
};

// @desc    Get site settings (public - used by website footer/contact)
// @route   GET /api/settings
const getSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  res.status(200).json({
    success: true,
    settings,
  });
});

// @desc    Update site settings (admin only)
// @route   PUT /api/settings
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  Object.assign(settings, req.body);
  await settings.save();

  res.status(200).json({
    success: true,
    settings,
  });
});

module.exports = { getSettings, updateSettings };
