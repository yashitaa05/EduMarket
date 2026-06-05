const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controller/usercontroller");

const {
  approveMaterial,
  deleteMaterial,
  getPendingMaterials,
} = require("../controller/materialController");

const authmiddleware = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");

// Get all users
router.get(
  "/users",
  authmiddleware,
  authorizeRoles("admin"),
  getAllUsers
);

// Pending materials
router.get(
  "/pending",
  authmiddleware,
  authorizeRoles("admin"),
  getPendingMaterials
);

// Approve material
router.put(
  "/material/:id/approve",
  authmiddleware,
  adminmiddleware,
  approveMaterial
);

// Delete material
router.delete(
  "/material/:id",
  authmiddleware,
  adminmiddleware,
  deleteMaterial
);

module.exports = router;