// src/controllers/authController.js
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Admin = require("../models/Admin");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// @desc    Register new admin (use once for initial setup, then lock down/remove route)
// @route   POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ErrorResponse("Admin with this email already exists", 400);
  }

  const admin = await Admin.create({ name, email, password });

  res.status(201).json({
    success: true,
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

// @desc    Login admin
// @route   POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorResponse("Please provide email and password", 400);
  }

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    throw new ErrorResponse("Invalid credentials", 401);
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new ErrorResponse("Invalid credentials", 401);
  }

  res.status(200).json({
    success: true,
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

// @desc    Get currently logged-in admin
// @route   GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

// @desc    Update logged-in admin's profile (name/email)
// @route   PUT /api/auth/me
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (email) {
    const existing = await Admin.findOne({
      email,
      _id: { $ne: req.admin._id },
    });
    if (existing) {
      throw new ErrorResponse("Email already in use", 400);
    }
  }

  const admin = await Admin.findByIdAndUpdate(
    req.admin._id,
    { name, email },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    success: true,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

// @desc    Change logged-in admin's password
// @route   PUT /api/auth/password
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ErrorResponse("Current and new password are required", 400);
  }

  const admin = await Admin.findById(req.admin._id).select("+password");
  const isMatch = await admin.comparePassword(currentPassword);

  if (!isMatch) {
    throw new ErrorResponse("Current password is incorrect", 401);
  }

  admin.password = newPassword;
  await admin.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

module.exports = { register, login, getMe, updateProfile, updatePassword };
