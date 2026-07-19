// src/controllers/uploadController.js
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("../config/cloudinary");

// @desc    Upload an image to Cloudinary (admin only)
// @route   POST /api/upload?folder=portfolio
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ErrorResponse("No image file provided", 400);
  }

  const subfolder = req.query.folder || "general";
  const folderPath = `${process.env.CLOUDINARY_FOLDER}/${subfolder}`;

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderPath, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(req.file.buffer);
  });

  res.status(200).json({
    success: true,
    url: result.secure_url,
  });
});

module.exports = { uploadImage };
