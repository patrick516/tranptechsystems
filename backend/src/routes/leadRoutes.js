// src/routes/leadRoutes.js
const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");
const { protect } = require("../middleware/auth");

// Public - contact form submission
router.post("/", createLead);

// Admin only
router.get("/", protect, getLeads);
router.get("/:id", protect, getLead);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

module.exports = router;
