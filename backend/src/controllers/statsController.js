// src/controllers/statsController.js
const asyncHandler = require("../utils/asyncHandler");
const Lead = require("../models/Lead");
const Portfolio = require("../models/Portfolio");

// @desc    Get dashboard analytics (admin only)
// @route   GET /api/stats/dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalLeads,
    leadsByStatusRaw,
    totalPortfolios,
    publishedPortfolios,
    featuredPortfolios,
    recentLeads,
    leadsByMonthRaw,
  ] = await Promise.all([
    Lead.countDocuments(),
    Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Portfolio.countDocuments(),
    Portfolio.countDocuments({ published: true }),
    Portfolio.countDocuments({ featured: true }),
    Lead.find().sort({ createdAt: -1 }).limit(5),
    Lead.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),
  ]);

  // Normalize status counts so all statuses always appear, even with 0
  const statusOrder = ["new", "contacted", "in_progress", "closed"];
  const leadsByStatus = statusOrder.map((status) => {
    const found = leadsByStatusRaw.find((s) => s._id === status);
    return { status, count: found ? found.count : 0 };
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const leadsByMonth = leadsByMonthRaw.map((entry) => ({
    month: `${monthNames[entry._id.month - 1]} ${entry._id.year}`,
    count: entry.count,
  }));

  res.status(200).json({
    success: true,
    stats: {
      totalLeads,
      leadsByStatus,
      leadsByMonth,
      totalPortfolios,
      publishedPortfolios,
      featuredPortfolios,
      recentLeads,
    },
  });
});

module.exports = { getDashboardStats };
