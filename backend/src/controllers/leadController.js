// src/controllers/leadController.js
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Lead = require("../models/Lead");

// @desc    Submit a new lead (public - from contact form)
// @route   POST /api/leads
const createLead = asyncHandler(async (req, res) => {
  const { name, email, phone, company, serviceInterest, message } = req.body;

  if (!name || !email || !message) {
    throw new ErrorResponse("Name, email and message are required", 400);
  }

  const lead = await Lead.create({
    name,
    email,
    phone,
    company,
    serviceInterest,
    message,
  });

  res.status(201).json({
    success: true,
    lead,
  });
});

// @desc    Get all leads (admin only)
// @route   GET /api/leads
const getLeads = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};

  const leads = await Lead.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: leads.length,
    leads,
  });
});

// @desc    Get single lead (admin only)
// @route   GET /api/leads/:id
const getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    throw new ErrorResponse("Lead not found", 404);
  }

  res.status(200).json({
    success: true,
    lead,
  });
});

// @desc    Update lead status (admin only)
// @route   PUT /api/leads/:id
const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    throw new ErrorResponse("Lead not found", 404);
  }

  res.status(200).json({
    success: true,
    lead,
  });
});

// @desc    Delete lead (admin only)
// @route   DELETE /api/leads/:id
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    throw new ErrorResponse("Lead not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Lead deleted successfully",
  });
});

module.exports = { createLead, getLeads, getLead, updateLead, deleteLead };
