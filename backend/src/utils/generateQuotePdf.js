// src/utils/generateQuotePdf.js
const PDFDocument = require("pdfkit");
const path = require("path");

const BRAND_GREEN = "#059669";
const DARK = "#111827";
const GRAY = "#6b7280";
const LIGHT_BG = "#f3f4f6";

const formatCurrency = (amount, currency) => {
  return `${currency} ${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
};

// Draws the full quote layout onto an existing PDFDocument instance
const drawQuote = (doc, quote, settings) => {
  const logoPath = path.join(__dirname, "../assets/logo.png");
  try {
    doc.image(logoPath, 50, 45, { width: 150 });
  } catch (e) {
    doc.fontSize(18).fillColor(DARK).text("TranpTech Systems", 50, 50);
  }

  doc
    .fontSize(22)
    .fillColor(DARK)
    .font("Helvetica-Bold")
    .text("QUOTATION", 350, 50, { align: "right" });
  doc
    .fontSize(11)
    .fillColor(BRAND_GREEN)
    .font("Helvetica-Bold")
    .text(quote.quoteNumber, 350, 78, { align: "right" });

  doc
    .moveTo(50, 115)
    .lineTo(545, 115)
    .strokeColor(LIGHT_BG)
    .lineWidth(1)
    .stroke();

  let y = 135;
  doc
    .fontSize(9)
    .fillColor(GRAY)
    .font("Helvetica-Bold")
    .text("BILLED TO", 50, y);
  y += 15;
  doc
    .fontSize(12)
    .fillColor(DARK)
    .font("Helvetica-Bold")
    .text(quote.clientName, 50, y);
  y += 16;
  if (quote.clientEmail) {
    doc
      .fontSize(10)
      .fillColor(GRAY)
      .font("Helvetica")
      .text(quote.clientEmail, 50, y);
  }

  const infoX = 320;
  let infoY = 135;
  const infoRow = (label, value) => {
    doc
      .fontSize(9)
      .fillColor(GRAY)
      .font("Helvetica-Bold")
      .text(label, infoX, infoY, { width: 90 });
    doc
      .fontSize(9)
      .fillColor(DARK)
      .font("Helvetica")
      .text(value, infoX + 95, infoY, { width: 130 });
    infoY += 16;
  };
  infoRow(
    "Quote Date",
    new Date(quote.createdAt || Date.now()).toLocaleDateString(),
  );
  infoRow("Project", quote.projectTitle);
  infoRow("Payment Terms", quote.paymentTerms);
  infoRow("Currency", quote.currency);

  y = 235;
  doc.rect(50, y, 495, 24).fill(BRAND_GREEN);
  doc.fontSize(9).fillColor("#ffffff").font("Helvetica-Bold");
  doc.text("DESCRIPTION", 60, y + 7);
  doc.text("QTY", 340, y + 7, { width: 50, align: "center" });
  doc.text("UNIT PRICE", 390, y + 7, { width: 70, align: "right" });
  doc.text("AMOUNT", 465, y + 7, { width: 70, align: "right" });

  y += 24;
  quote.items.forEach((item, i) => {
    const rowHeight = 28;
    if (i % 2 === 0) {
      doc.rect(50, y, 495, rowHeight).fill(LIGHT_BG);
    }
    doc.fontSize(9.5).fillColor(DARK).font("Helvetica");
    doc.text(item.description, 60, y + 9, { width: 270 });
    doc.text(String(item.quantity), 340, y + 9, { width: 50, align: "center" });
    doc.text(formatCurrency(item.unitPrice, quote.currency), 390, y + 9, {
      width: 70,
      align: "right",
    });
    doc.text(
      formatCurrency(item.quantity * item.unitPrice, quote.currency),
      465,
      y + 9,
      {
        width: 70,
        align: "right",
      },
    );
    y += rowHeight;
  });

  y += 15;
  const subtotal = quote.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const total = subtotal - (quote.discount || 0);

  const totalsX = 340;
  doc
    .fontSize(9.5)
    .fillColor(GRAY)
    .font("Helvetica")
    .text("SUBTOTAL", totalsX, y);
  doc
    .fillColor(DARK)
    .text(formatCurrency(subtotal, quote.currency), totalsX + 100, y, {
      width: 95,
      align: "right",
    });
  y += 18;
  doc.fillColor(GRAY).text("DISCOUNT", totalsX, y);
  doc
    .fillColor(DARK)
    .text(
      formatCurrency(quote.discount || 0, quote.currency),
      totalsX + 100,
      y,
      {
        width: 95,
        align: "right",
      },
    );
  y += 22;
  doc.rect(totalsX - 10, y - 6, 215, 28).fill(BRAND_GREEN);
  doc
    .fontSize(11)
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .text("TOTAL", totalsX, y + 2);
  doc.text(formatCurrency(total, quote.currency), totalsX + 90, y + 2, {
    width: 105,
    align: "right",
  });

  y += 55;
  if (quote.notes) {
    doc.fontSize(9).fillColor(GRAY).font("Helvetica-Bold").text("NOTES", 50, y);
    y += 14;
    doc
      .fontSize(9)
      .fillColor(GRAY)
      .font("Helvetica")
      .text(quote.notes, 50, y, { width: 495 });
    y += 45;
  }

  if (settings?.bankDetails?.bankName) {
    doc
      .fontSize(9)
      .fillColor(GRAY)
      .font("Helvetica-Bold")
      .text("PAYMENT INFORMATION", 50, y);
    y += 15;
    doc
      .fontSize(9.5)
      .fillColor(DARK)
      .font("Helvetica")
      .text(`Bank: ${settings.bankDetails.bankName}`, 50, y);
    y += 14;
    doc.text(`Account Name: ${settings.bankDetails.accountName}`, 50, y);
    y += 14;
    doc.text(`Account Number: ${settings.bankDetails.accountNumber}`, 50, y);
    y += 30;
  }

  doc
    .fontSize(11)
    .fillColor(BRAND_GREEN)
    .font("Helvetica-BoldOblique")
    .text("Thank you!", 50, y);
  y += 16;
  doc
    .fontSize(9)
    .fillColor(GRAY)
    .font("Helvetica")
    .text(
      "We appreciate your business and look forward to working with you.",
      50,
      y,
      { width: 300 },
    );

  doc
    .fontSize(9)
    .fillColor(DARK)
    .font("Helvetica-Bold")
    .text("Patrick Kulinji", 350, y);
  doc
    .fontSize(8.5)
    .fillColor(GRAY)
    .font("Helvetica")
    .text("Managing Director", 350, y + 13);
  doc.text("TranpTech Systems", 350, y + 25);

  const footerY = 780;
  doc.rect(0, footerY, 595, 40).fill(BRAND_GREEN);
  const footerText = [
    settings?.contactPhone,
    settings?.contactEmail,
    "tranptechsystems.com",
  ]
    .filter(Boolean)
    .join("   |   ");
  doc
    .fontSize(9)
    .fillColor("#ffffff")
    .font("Helvetica")
    .text(footerText, 50, footerY + 14, { width: 495, align: "center" });
};

// Streams the PDF directly to an HTTP response (used for "View PDF" in admin)
const generateQuotePdf = (quote, settings, res) => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=${quote.quoteNumber}.pdf`,
  );
  doc.pipe(res);
  drawQuote(doc, quote, settings);
  doc.end();
};

// Builds the PDF into an in-memory buffer (used for email attachments)
const generateQuotePdfBuffer = (quote, settings) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    drawQuote(doc, quote, settings);
    doc.end();
  });
};

module.exports = { generateQuotePdf, generateQuotePdfBuffer };
