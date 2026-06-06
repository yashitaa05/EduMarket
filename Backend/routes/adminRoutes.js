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

// ================= ADMIN USERS =================
router.get(
  "/users",
  authmiddleware,
  authorizeRoles("admin"),
  getAllUsers
);

// ================= ADMIN MATERIALS =================
router.get(
  "/materials/pending",
  authmiddleware,
  authorizeRoles("admin"),
  getPendingMaterials
);

router.put(
  "/materials/:id/approve",
  authmiddleware,
  authorizeRoles("admin"),
  approveMaterial
);

router.delete(
  "/materials/:id",
  authmiddleware,
  authorizeRoles("admin"),
  deleteMaterial
);

router.delete(
  "/users/:id",
  authmiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const userId = req.params.id;

      const User = require("../models/User"); // adjust path if needed

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      await User.findByIdAndDelete(userId);

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

module.exports = router;