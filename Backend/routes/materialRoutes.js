const express = require("express");
const router = express.Router();

const {
  createMaterial,
  getMaterials,
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
  getMyMaterials,
} = require("../controller/materialController");

const authmiddleware = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");
const upload = require("../middleware/multer");

// Get all materials
router.get("/", getMaterials);

// Create material
router.post(
  "/",
  authmiddleware,
  authorizeRoles("creator", "admin"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createMaterial
);

// Upload PDF
router.post(
  "/upload-pdf",
  authmiddleware,
  upload.single("pdf"),
  (req, res) => {
    res.status(200).json({
      success: true,
      pdfUrl: req.file.path,
    });
  }
);

// Creator Stats
router.get(
  "/creator/stats",
  authmiddleware,
  getCreatorStats
);

// My Materials
router.get(
  "/my-materials",
  authmiddleware,
  getMyMaterials
);

// Wishlist
router.post(
  "/wishlist/:materialId",
  authmiddleware,
  addToWishlist
);

router.delete(
  "/wishlist/:materialId",
  authmiddleware,
  removeFromWishlist
);

router.get(
  "/wishlist",
  authmiddleware,
  getWishlist
);

// Download
router.get(
  "/:id/download",
  authmiddleware,
  downloadMaterial
);

// Reviews
router.post(
  "/:id/review",
  authmiddleware,
  addReview
);

router.get(
  "/:id/reviews",
  getMaterialReviews
);

// Keep ID routes last
router.get("/:id", getMaterialById);

router.put(
  "/:id",
  authmiddleware,
  authorizeRoles("creator", "admin"),
  updateMaterial
);

router.delete(
  "/:id",
  authmiddleware,
  authorizeRoles("creator", "admin"),
  deleteMaterial
);

module.exports = router;