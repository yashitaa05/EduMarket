const user = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      mobile_number,
      role
    } = req.body;

// Check existing user
const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

console.log("req.body =", req.body);
console.log("role =", role);

// Create user
const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      mobile_number,
      role: role === "creator" ? "creator" : "student"
    });
console.log("saved user =", newUser);

// Success response
    res.status(201).json({
      message: "User Registered Successfully",

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile_number: newUser.mobile_number,
      },
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

// Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

// Find user
const existingUser = await user.findOne({ email });

// Check user exists
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

// Check password
const isMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

// Invalid password
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    
console.log("Login User ID:", existingUser._id);
console.log("Login User Role:", existingUser.role);
// Create token
const token = jwt.sign(
      { id: existingUser._id, 
       role: existingUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

console.log(existingUser.role);

// Success response
    res.status(200).json({
      message: "Login Successful",
      token,

      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await user.find().select("-password");  
    res.status(200).json({
      message: "Users retrieved successfully",
      users: users
    });
  } catch (error) { 
    console.error("Error retrieving users:", error);  
    res.status(500).json({
      message: "Server error while retrieving users",
      error: error.message
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await user.findById(req.user.id)
      .select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  getallusers
};