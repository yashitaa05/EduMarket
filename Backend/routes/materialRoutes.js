const express = require("express");
const router = express.Router();

const {
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
  getMyMaterials,

  // Admin Approval Functions
  getPendingMaterials,
  approveMaterial,
} = require("../controller/materialcontroller");

const authmiddleware = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");
const upload = require("../middleware/multer");

// =======================
// PUBLIC ROUTES
// =======================

// Get all approved materials
router.get("/", getAllMaterials);

// =======================
// CREATOR ROUTES
// =======================

// Create Material
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

// Creator Materials
router.get(
  "/my-materials",
  authmiddleware,
  getMyMaterials
);

// =======================
// WISHLIST ROUTES
// =======================

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

// =======================
// DOWNLOAD ROUTES
// =======================

router.get(
  "/:id/download",
  authmiddleware,
  downloadMaterial
);

// =======================
// REVIEW ROUTES
// =======================

router.post(
  "/:id/review",
  authmiddleware,
  addReview
);

router.get(
  "/:id/reviews",
  getMaterialReviews
);

// =======================
// ADMIN APPROVAL ROUTES
// =======================

router.get(
  "/admin/pending",
  authmiddleware,
  authorizeRoles("admin"),
  getPendingMaterials
);

router.put(
  "/admin/material/:id/approve",
  authmiddleware,
  authorizeRoles("admin"),
  approveMaterial
);

// =======================
// MATERIAL CRUD ROUTES
// KEEP THESE LAST
// =======================

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