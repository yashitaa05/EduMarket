const Material = require("../models/material");
const Review = require("../models/review");

const createMaterial = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      category,
      price,
    } = req.body;

    const thumbnail = req.files?.thumbnail?.[0]?.path || "";
    const pdfUrl = req.files?.pdf?.[0]?.path || "";

    const newMaterial = await Material.create({
      title,
      description,
      subject,
      category,
      price,
      pdfUrl,
      thumbnail,
      creator: req.user.id,
    });

    res.status(201).json({
      message: "Material created successfully",
      material: newMaterial,
    });
  } catch (error) {
    console.error("Error creating material:", error);

    res.status(500).json({
      message: "Server error while creating material",
      error: error.message,
    });
  }
};

const getMaterials = async (req, res) => {
  try {
    const {
      search,
      subject,
      category,
      price,
      sort = "newest",
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    // SEARCH
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // FILTERS
    if (subject) filter.subject = subject;
    if (category) filter.category = category;

    if (price === "free") filter.price = 0;
    if (price === "paid") filter.price = { $gt: 0 };

    // SORTING
    let sortOption = {};

    if (sort === "newest") sortOption.createdAt = -1;
    if (sort === "oldest") sortOption.createdAt = 1;
    if (sort === "popular") sortOption.downloads = -1;
    if (sort === "rating") sortOption.averageRating = -1;

    // PAGINATION
    const skip = (page - 1) * limit;

    const materials = await Material.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate("creator", "name email");

    const total = await Material.countDocuments(filter);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: materials,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMaterialById = async (req, res) => {
    try {
        const material = await Material.findByIdAndUpdate(
             req.params.id,
            { $inc: { views: 1 } },
            { new: true }
         ).populate("creator", "name email");

        if (!material) {
            return res.status(404).json({
                message: "Material not found"
            });
        }
        res.status(200).json({
            message: "Material retrieved successfully",
            material: material
        });
    } catch (error) {
        console.error("Error retrieving material:", error);
        res.status(500).json({
            message: "Server error while retrieving material",
            error: error.message
        });
    }
};

const updateMaterial = async (req, res) => {
    try{
        const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true }, {runValidators: true});
        if (!material) {
            return res.status(404).json({
                message: "Material not found"
            });
        }
        res.status(200).json({
            message: "Material updated successfully",
            material: material
        });
    } catch (error) {
        console.error("Error updating material:", error);
        res.status(500).json({
            message: "Server error while updating material",
            error: error.message
        });
    }
};

const deleteMaterial = async (req, res) => {
    try {
        const material = await Material.findByIdAndDelete(req.params.id);
        if (!material) {
            return res.status(404).json({
                message: "Material not found"
            });
        }
        res.status(200).json({
            message: "Material deleted successfully",
            material: material
        });
    } catch (error) {
        console.error("Error deleting material:", error);
        res.status(500).json({
            message: "Server error while deleting material",
            error: error.message
        });
    }
};

const downloadMaterial = async (req, res) => {
    try {
        const material = await Material.findByIdAndUpdate(
            req.params.id,
            { $inc: { downloads: 1 } },
            { new: true }
        );

        if (!material) {
            return res.status(404).json({
                success: false,
                message: "Material not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Download tracked successfully",
            pdfUrl: material.pdfUrl
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    // Check duplicate review
    const existingReview = await Review.findOne({
      user: req.user.id,
      material: req.params.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this material",
      });
    }

    // Create review
    await Review.create({
      user: req.user.id,
      material: req.params.id,
      rating,
      comment,
    });

    // Recalculate rating
    const reviews = await Review.find({
      material: req.params.id,
    });

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const averageRating =
      reviews.length > 0
        ? totalRating / reviews.length
        : 0;

    await Material.findByIdAndUpdate(req.params.id, {
      averageRating,
      numReviews: reviews.length,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

}
};


    const getMaterialReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      material: req.params.id,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }};

const addToWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: {
          wishlist: req.params.materialId,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          wishlist: req.params.materialId,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("wishlist");

    res.status(200).json({
      success: true,
      count: user.wishlist.length,
      wishlist: user.wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
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
    getWishlist
};    