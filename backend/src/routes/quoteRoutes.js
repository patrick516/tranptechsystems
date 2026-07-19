// src/routes/quoteRoutes.js
const express = require("express");
const router = express.Router();
const {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  downloadQuotePdf,
  sendQuoteEmail,
} = require("../controllers/quoteController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", getQuotes);
router.get("/:id", getQuote);
router.get("/:id/pdf", downloadQuotePdf);
router.post("/:id/send", sendQuoteEmail);
router.post("/", createQuote);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);

module.exports = router;
