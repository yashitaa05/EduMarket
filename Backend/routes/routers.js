const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  getallusers,
  getCurrentUser
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
  getCreatorStats
} = require("../controller/materialController");

const authmiddleware = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");
const upload = require("../middleware/multer");

// ================= USER ROUTES =================

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authmiddleware, getProfile);

router.get(
  "/users",
  authmiddleware,
  authorizeRoles("admin"),
  getallusers
);

// ================= MATERIAL ROUTES =================

// Get all materials
router.get("/", getMaterials);

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

// Create Material
router.post(
  "/create",
  authmiddleware,
  authorizeRoles("creator", "admin"),
  upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
]),
  createMaterial
);

// Update Material
router.put(
  "/:id",
  authmiddleware,
  authorizeRoles("creator", "admin"),
  updateMaterial
);

// Delete Material
router.delete(
  "/:id",
  authmiddleware,
  authorizeRoles("creator", "admin"),
  deleteMaterial
);

// Download Material
router.get("/materials/:id/download", authmiddleware, downloadMaterial);


// Get Single Material (keep at bottom)
router.get("/:id", getMaterialById);

router.post(
  "/materials/:id/review",
  authmiddleware,
  addReview
);

router.get(
  "/materials/:id/reviews",
  getMaterialReviews
);

// Wishlist route
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

// creator stats route
router.get("/creator/stats", authmiddleware, getCreatorStats);

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

router.get(
  "/me",
  authmiddleware,
  getCurrentUser
);

// router.get(
//   "/admin/users",
//   authmiddleware,
//   adminmiddleware,
//   getAllUsers
// );

module.exports = router;