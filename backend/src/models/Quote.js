// src/models/Quote.js
const mongoose = require("mongoose");

const quoteItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true, default: 0 },
  },
  { _id: false },
);

const quoteSchema = new mongoose.Schema(
  {
    quoteNumber: { type: String, required: true, unique: true },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
    clientName: { type: String, required: true, trim: true },
    clientEmail: { type: String, trim: true },
    projectTitle: { type: String, required: true, trim: true },
    items: { type: [quoteItemSchema], default: [] },
    discount: { type: Number, default: 0 },
    currency: { type: String, default: "MWK" },
    paymentTerms: { type: String, default: "50% Deposit | 50% on Completion" },
    notes: {
      type: String,
      default:
        "This quote excludes domain purchase, hosting, business email and third-party services/plugins.",
    },
    status: {
      type: String,
      enum: ["draft", "sent", "accepted", "rejected"],
      default: "draft",
    },
  },
  { timestamps: true },
);

quoteSchema.virtual("subtotal").get(function () {
  return this.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
});

quoteSchema.virtual("total").get(function () {
  return this.subtotal - this.discount;
});

quoteSchema.set("toJSON", { virtuals: true });
quoteSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Quote", quoteSchema);
