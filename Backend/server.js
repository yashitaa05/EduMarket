const express = require("express");
const connection = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

connection
  .then(() => {
    console.log("MongoDB Connected");

    app.use(cors());
    app.use(express.json());

    app.use("/api/auth", authRoutes);
    app.use("/api/materials", materialRoutes);
    app.use("/api/admin", adminRoutes);

    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });