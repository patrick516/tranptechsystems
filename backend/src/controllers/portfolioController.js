// src/controllers/portfolioController.js
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Portfolio = require("../models/Portfolio");

// @desc    Get all published portfolio items (public)
// @route   GET /api/portfolio
const getPortfolios = asyncHandler(async (req, res) => {
  const { featured } = req.query;

  const filter = { published: true };
  if (featured === "true") filter.featured = true;

  const portfolios = await Portfolio.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: portfolios.length,
    portfolios,
  });
});

// @desc    Get all portfolio items including unpublished (admin only)
// @route   GET /api/portfolio/admin
const getPortfoliosAdmin = asyncHandler(async (req, res) => {
  const portfolios = await Portfolio.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: portfolios.length,
    portfolios,
  });
});

// @desc    Get single portfolio item by slug (public)
// @route   GET /api/portfolio/:slug
const getPortfolioBySlug = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({
    slug: req.params.slug,
    published: true,
  });

  if (!portfolio) {
    throw new ErrorResponse("Portfolio item not found", 404);
  }

  res.status(200).json({
    success: true,
    portfolio,
  });
});

// @desc    Create portfolio item (admin only)
// @route   POST /api/portfolio
const createPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.create(req.body);

  res.status(201).json({
    success: true,
    portfolio,
  });
});

// @desc    Update portfolio item (admin only)
// @route   PUT /api/portfolio/:id
const updatePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!portfolio) {
    throw new ErrorResponse("Portfolio item not found", 404);
  }

  res.status(200).json({
    success: true,
    portfolio,
  });
});

// @desc    Delete portfolio item (admin only)
// @route   DELETE /api/portfolio/:id
const deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

  if (!portfolio) {
    throw new ErrorResponse("Portfolio item not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Portfolio item deleted successfully",
  });
});

module.exports = {
  getPortfolios,
  getPortfoliosAdmin,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
