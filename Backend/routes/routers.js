const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  getallusers,
  getCurrentUser,
} = require("../controller/usercontroller");

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
  approveMaterial,
  getCreatorStats,
  getMyMaterials
} = require("../controller/materialController");

const authmiddleware = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");
const upload = require("../middleware/multer");


// ================= USER ROUTES =================

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authmiddleware, getProfile);

router.get( "/me", authmiddleware, getCurrentUser );

router.get( "/users", authmiddleware, authorizeRoles("admin"), getallusers);

// ================= MATERIAL ROUTES =================

// GET /api/materials
router.get("/", getMaterials);

// POST /api/materials
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

// POST /api/materials/upload-pdf
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

// ================= CREATOR =================

// GET /api/materials/creator/stats
router.get(
  "/creator/stats",
  authmiddleware,
  getCreatorStats
);

// ================= WISHLIST =================

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

// ================= MATERIAL ACTIONS =================

// GET /api/materials/:id/download
router.get(
  "/:id/download",
  authmiddleware,
  downloadMaterial
);

// POST /api/materials/:id/review
router.post(
  "/:id/review",
  authmiddleware,
  addReview
);

// GET /api/materials/:id/reviews
router.get(
  "/:id/reviews",
  getMaterialReviews
);

// ================= ADMIN =================

router.put(
  "/admin/material/:id/approve",
  authmiddleware,
  adminmiddleware,
  approveMaterial
);

router.delete(
  "/admin/material/:id",
  authmiddleware,
  adminmiddleware,
  deleteMaterial
);

// ================= SINGLE MATERIAL =================
// KEEP THESE LAST

router.get(
  "/my-materials",
  authmiddleware,
  getMyMaterials
);

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
