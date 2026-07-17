// src/routes/portfolioRoutes.js
const express = require("express");
const router = express.Router();
const {
  getPortfolios,
  getPortfoliosAdmin,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");
const { protect } = require("../middleware/auth");

// Admin only - must come before /:slug so "admin" isn't treated as a slug
router.get("/admin", protect, getPortfoliosAdmin);
router.post("/", protect, createPortfolio);
router.put("/:id", protect, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);

// Public
router.get("/", getPortfolios);
router.get("/:slug", getPortfolioBySlug);

module.exports = router;
