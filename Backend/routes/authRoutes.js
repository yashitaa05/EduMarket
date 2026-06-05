const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  getCurrentUser,
} = require("../controller/usercontroller");

const authmiddleware = require("../middleware/authmiddleware");

// Auth Routes
router.post("/register", register);
router.post("/login", login);

router.get("/profile", authmiddleware, getProfile);

router.get(
  "/me",
  authmiddleware,
  getCurrentUser
);

module.exports = router;