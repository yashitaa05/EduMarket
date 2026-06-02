const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

if (!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }

const token = authHeader.split(" ")[1];

console.log("TOKEN:", token); 
console.log("SECRET:", process.env.JWT_SECRET);

const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

console.log("Decoded Token:", decoded);

req.user = decoded;

next();
   

} catch (error) {
    res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = authmiddleware;