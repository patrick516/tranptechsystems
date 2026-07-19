const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Quote = require("../models/Quote");
const SiteSettings = require("../models/SiteSettings");
const {
  generateQuotePdf,
  generateQuotePdfBuffer,
} = require("../utils/generateQuotePdf");
const sendEmail = require("../utils/sendEmail");

// Generates the next quote number, e.g. QUO-2026-0001
const generateQuoteNumber = async () => {
  const year = new Date().getFullYear();
  const count = await Quote.countDocuments({
    quoteNumber: { $regex: `^QUO-${year}-` },
  });
  const next = String(count + 1).padStart(4, "0");
  return `QUO-${year}-${next}`;
};

// @desc    Get all quotes (admin only)
// @route   GET /api/quotes
const getQuotes = asyncHandler(async (req, res) => {
  const quotes = await Quote.find()
    .populate("lead", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: quotes.length,
    quotes,
  });
});

// @desc    Get single quote (admin only)
// @route   GET /api/quotes/:id
const getQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id).populate(
    "lead",
    "name email",
  );

  if (!quote) {
    throw new ErrorResponse("Quote not found", 404);
  }

  res.status(200).json({
    success: true,
    quote,
  });
});

// @desc    Create quote (admin only)
// @route   POST /api/quotes
const createQuote = asyncHandler(async (req, res) => {
  const quoteNumber = await generateQuoteNumber();

  const quote = await Quote.create({ ...req.body, quoteNumber });

  res.status(201).json({
    success: true,
    quote,
  });
});

// @desc    Update quote (admin only)
// @route   PUT /api/quotes/:id
const updateQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!quote) {
    throw new ErrorResponse("Quote not found", 404);
  }

  res.status(200).json({
    success: true,
    quote,
  });
});

// @desc    Delete quote (admin only)
// @route   DELETE /api/quotes/:id
const deleteQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);

  if (!quote) {
    throw new ErrorResponse("Quote not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Quote deleted successfully",
  });
});

const downloadQuotePdf = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    throw new ErrorResponse("Quote not found", 404);
  }

  const settings = await SiteSettings.findOne();

  generateQuotePdf(quote, settings, res);
});

// @desc    Email the quote PDF to the client (admin only)
// @route   POST /api/quotes/:id/send
const sendQuoteEmail = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    throw new ErrorResponse("Quote not found", 404);
  }
  if (!quote.clientEmail) {
    throw new ErrorResponse("This quote has no client email to send to", 400);
  }

  const settings = await SiteSettings.findOne();
  const pdfBuffer = await generateQuotePdfBuffer(quote, settings);

  await sendEmail({
    to: quote.clientEmail,
    subject: `Quotation ${quote.quoteNumber} - ${quote.projectTitle}`,
    text: `Hi ${quote.clientName},\n\nPlease find attached your quotation for "${quote.projectTitle}" from TranpTech Systems.\n\nTotal: ${quote.currency} ${(quote.total ?? 0).toLocaleString()}\n\nLet us know if you have any questions.\n\nBest regards,\nTranpTech Systems`,
    attachments: [
      {
        filename: `${quote.quoteNumber}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  quote.status = "sent";
  await quote.save();

  res.status(200).json({
    success: true,
    message: "Quote emailed successfully",
    quote,
  });
});

module.exports = {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  downloadQuotePdf,
  sendQuoteEmail,
};
