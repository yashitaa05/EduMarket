const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  
  description: {
    type: String,
    required: false
  },

  subject: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: false
  },

  price: {
    type: Number,
    required: true
  },

    pdfUrl: {   
    type: String,
    required: true
  },

  thumbnail: {
    type: String,
    required: false
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  downloads: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    min: 0,
    max: 5
  },

  views: {
  type: Number,
  default: 0,
  },

  averageRating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},

status: {
  type: String,
  default: "pending",
},
  isApproved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Material", MaterialSchema);
