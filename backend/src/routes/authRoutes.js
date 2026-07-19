// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// ⚠️ Disabled after initial admin setup — uncomment only if you need to create another admin,
// then comment it out again immediately after.
// router.post('/register', register);

router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.put("/password", protect, updatePassword);

module.exports = router;
