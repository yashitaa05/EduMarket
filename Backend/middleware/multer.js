const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "materials",
    resource_type: "auto", // handles images and PDFs automatically
  },
});

const upload = multer({ storage });

module.exports = upload;