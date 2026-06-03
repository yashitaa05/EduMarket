const express = require("express");
const connection = require("./config/db");
const dotenv = require("dotenv");
const authroutes = require("./routes/routers");
const materialroutes = require("./routes/routers");
const cors = require("cors");

dotenv.config();


const app = express(); 
connection
  .then(() => {
    console.log("MongoDB Connected");
    app.use(cors());
    app.use(express.json());

    app.use("/api/auth", authroutes);
    app.use("/api/materials", materialroutes);
    

    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });


  