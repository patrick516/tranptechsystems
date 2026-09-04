const crypto = require("crypto"); //
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Admin = require("../models/Admin");
const sendEmail = require("../utils/sendEmail");

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

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ErrorResponse("Please provide an email address", 400);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    // For security, do not reveal if email exists or not
    // We'll still return a generic success message
    return res.status(200).json({
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  }

  // Generate a secure random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token and store it (optional – we store plain token for simplicity)
  // Many implementations store the hashed version, but we'll store plain + expiry
  admin.resetPasswordToken = resetToken;
  admin.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await admin.save();

  // Build reset URL (adjust to your frontend URL)
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

  // Email content
  const subject = "Password Reset Request";
  const text = `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n
Please click on the following link, or paste it into your browser, to complete the process:\n\n
${resetUrl}\n\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f7fc;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 580px;
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.08);
      padding: 40px 30px;  /* reduced left/right padding */
      text-align: left;    /* left-align everything */
    }
    .logo {
      text-align: left;    /* logo left */
      margin-bottom: 28px;
    }
    .logo img {
      max-width: 140px;
      height: auto;
    }
    .header {
      text-align: left;    /* heading left */
      margin-bottom: 30px;
    }
    .header h1 {
      color: #1e1b4b;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.4px;
      margin-bottom: 6px;
    }
    .header p {
      color: #6b7280;
      font-size: 15px;
    }
    .body-text {
      color: #1f2937;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .body-text strong {
      color: #1e1b4b;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      color: #ffffff !important;
      font-weight: 600;
      font-size: 16px;
      padding: 14px 34px;
      border-radius: 40px;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
      transition: all 0.2s;
      margin: 8px 0 18px 0;  /* left-aligned */
    }
    .btn:hover {
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      box-shadow: 0 6px 18px rgba(59, 130, 246, 0.35);
      transform: translateY(-1px);
    }
    .fallback-link {
      display: block;
      word-break: break-all;
      background: #f8fafc;
      padding: 12px 15px;
      border-radius: 8px;
      font-size: 13px;
      color: #4b5563;
      border: 1px solid #e5e7eb;
      margin: 18px 0 8px 0;
    }
    .fallback-link a {
      color: #3b82f6;
      text-decoration: underline;
    }
    .footer {
      margin-top: 30px;
      text-align: left;    /* footer left */
      font-size: 13px;
      color: #9ca3af;
      border-top: 1px solid #e5e7eb;
      padding-top: 22px;
    }
    .footer span {
      color: #6b7280;
    }
    @media (max-width: 480px) {
      .container { padding: 30px 20px; }
      .header h1 { font-size: 22px; }
      .btn { padding: 12px 28px; font-size: 15px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Logo -->
    <div class="logo">
      <img src="https://tranptechsystems.vercel.app/images/SYstemsLogo.png" alt="TranpTech Systems" />
    </div>

    <div class="header">
      <h1>Reset Your Password</h1>
      <p>We received a request to reset the password for your account.</p>
    </div>

    <div class="body-text">
      Hello <strong>${admin.name || "there"}</strong>,
      <br /><br />
      You (or someone else) requested a password reset for your <strong>TranpTech Systems</strong> account.
      <br /><br />
      Click the button below to create a new password:
    </div>

    <!-- Left-aligned button -->
    <div>
      <a href="${resetUrl}" class="btn" target="_blank">Reset Password</a>
    </div>

    <div style="font-size: 14px; color: #6b7280; margin: 10px 0 6px 0; text-align: left;">
      Or copy and paste this link into your browser:
    </div>
    <div class="fallback-link">
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    </div>

    <div class="body-text" style="font-size: 14px; color: #6b7280; margin-top: 20px; text-align: left;">
      This link will expire in <strong>10 minutes</strong>.
      <br /><br />
      If you did not request this, please ignore this email and your password will remain unchanged.
    </div>

    <div class="footer">
      &copy; 2026 <span>TranpTech Systems</span> – All rights reserved.
      <br />
      <span style="font-size: 12px;">This is an automated message, please do not reply.</span>
    </div>
  </div>
</body>
</html>
`;

  try {
    await sendEmail({
      to: admin.email,
      subject,
      text,
      html,
    });

    res.status(200).json({
      success: true,
      message: "Reset link sent to your email.",
    });
  } catch (err) {
    // If email fails, clear the token fields
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    throw new ErrorResponse(
      "Email could not be sent. Please try again later.",
      500,
    );
  }
});

// @desc    Reset password using token
// @route   POST /api/auth/reset-password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new ErrorResponse("Token and new password are required", 400);
  }

  // Find admin with matching token and not expired
  const admin = await Admin.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!admin) {
    throw new ErrorResponse("Invalid or expired reset token", 400);
  }

  // Update password – pre-save hook will hash it
  admin.password = newPassword;
  // Clear the reset fields
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpires = undefined;

  await admin.save();

  // Optionally, you can generate a new JWT token and send it back so user is logged in immediately
  // const tokenJwt = generateToken(admin._id); but we'll just return success

  res.status(200).json({
    success: true,
    message: "Password has been reset successfully. Please log in.",
  });
});

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
};
