const Material = require("../models/material");
const Review = require("../models/review");
const User = require("../models/User");

// =========================
// CREATE MATERIAL
// =========================
const createMaterial = async (req, res) => {
  try {
    const { title, description, subject, category, price } = req.body;

    const pdfUrl = req.files?.pdf?.[0]?.path || "";
    const thumbnail = req.files?.thumbnail?.[0]?.path || "";

    const material = await Material.create({
      title,
      description,
      subject,
      category,
      price,
      pdfUrl,
      thumbnail,
      creator: req.user.id,
      status: "pending",
      isApproved: false,
      views: 0,
      downloads: 0,
    });

    res.status(201).json({
      success: true,
      message: "Material submitted for approval",
      material,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// GET ALL MATERIALS (PUBLIC)
// =========================
const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find({})
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: materials,
      count: materials.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =========================
// GET MATERIAL BY ID
// =========================
const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("creator", "name email");

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.status(200).json({
      message: "Material retrieved successfully",
      material,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// UPDATE MATERIAL
// =========================
const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.status(200).json({
      message: "Material updated successfully",
      material,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// DELETE MATERIAL
// =========================
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    await material.deleteOne();

    res.status(200).json({
      success: true,
      message: "Material deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// DOWNLOAD TRACK
// =========================
const downloadMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.status(200).json({
      success: true,
      pdfUrl: material.pdfUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// REVIEW SYSTEM
// =========================
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    const existing = await Review.findOne({
      user: req.user.id,
      material: req.params.id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already reviewed" });
    }

    await Review.create({
      user: req.user.id,
      material: req.params.id,
      rating,
      comment,
    });

    const reviews = await Review.find({ material: req.params.id });

    const avg =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Material.findByIdAndUpdate(req.params.id, {
      averageRating: avg,
      numReviews: reviews.length,
    });

    res.status(201).json({ success: true, message: "Review added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMaterialReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      material: req.params.id,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// WISHLIST
// =========================
const addToWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { wishlist: req.params.materialId } },
      { new: true }
    );

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { wishlist: req.params.materialId } },
      { new: true }
    );

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");

    res.json({
      success: true,
      count: user.wishlist.length,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// CREATOR STATS (FIXED)
// =========================
const getCreatorStats = async (req, res) => {
  try {
    const materials = await Material.find({ creator: req.user.id });

    const totalUploads = materials.length;
    const totalDownloads = materials.reduce((a, b) => a + (b.downloads || 0), 0);
    const totalViews = materials.reduce((a, b) => a + (b.views || 0), 0);

    const avgRating =
      materials.length > 0
        ? materials.reduce((a, b) => a + (b.averageRating || 0), 0) /
          materials.length
        : 0;

    const topMaterials = await Material.find({ creator: req.user.id })
      .sort({ downloads: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalUploads,
        totalDownloads,
        totalViews,
        avgRating,
      },
      topMaterials,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// ADMIN APPROVAL
// =========================
const approveMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { status: "approved", isApproved: true },
      { new: true }
    );

    res.json({
      success: true,
      message: "Approved",
      material,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// MY MATERIALS
// =========================
const getMyMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ creator: req.user.id });

    res.json({ success: true, data: materials });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// ADMIN: PENDING
// =========================
const getPendingMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ status: "pending" })
      .populate("creator", "name email");

    res.json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// EXPORTS (IMPORTANT FIX)
// =========================
module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  downloadMaterial,
  addReview,
  getMaterialReviews,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getCreatorStats,
  approveMaterial,
  getMyMaterials,
  getPendingMaterials,
};