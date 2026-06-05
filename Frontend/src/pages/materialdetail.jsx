import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getMaterialById,
  downloadMaterial,
  getMaterialReviews,
  addReview,
} from "../api/material";

import { addToWishlist } from "../api/wishlist";
import ReviewCard from "../components/reviewcard";

const MaterialDetail = () => {
  const { id } = useParams();

  const [material, setMaterial] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    Promise.all([fetchMaterial(), fetchReviews()]);
  }, [id]);

  const fetchMaterial = async () => {
    try {
      const data = await getMaterialById(id);
      setMaterial(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await getMaterialReviews(id);
      setReviews(data.reviews || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    try {
      const data = await downloadMaterial(id);
      window.open(data.pdfUrl || material.pdfUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(id);
      alert("Added to wishlist ❤️");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReview(id, { rating, comment });
      setComment("");
      fetchReviews();
      fetchMaterial();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading course...</h2>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Material not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION (Udemy style) */}
      <div className="bg-slate-900 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* LEFT - MAIN INFO */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold">{material.title}</h1>

            <p className="mt-3 text-gray-300">
              {material.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
              <span>📁 {material.category}</span>
              <span>👁 {material.views || 0} views</span>
              <span>⬇ {material.downloads || 0} downloads</span>
              <span>⭐ {material.averageRating || 0}/5</span>
              <span>🧾 {material.numReviews || 0} reviews</span>
            </div>

            <p className="mt-4 text-gray-300">
              Created by{" "}
              <span className="font-semibold text-white">
                {material.creator?.name}
              </span>
            </p>
          </div>

          {/* RIGHT - STICKY ACTION BOX */}
          <div className="bg-white text-black rounded-xl p-5 shadow-lg">
            <img
              src={material.thumbnail}
              className="w-full h-40 object-cover rounded-lg"
            />

            <button
              onClick={handleDownload}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Download PDF
            </button>

            <button
              onClick={handleAddToWishlist}
              className="w-full mt-3 bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
            >
              ❤️ Save to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">

        {/* REVIEWS SECTION */}
        <div className="md:col-span-2">

          {/* REVIEW FORM */}
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">
              Write a Review
            </h2>

            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border p-2 rounded w-full"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {"⭐".repeat(r)} ({r})
                  </option>
                ))}
              </select>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="border p-2 w-full rounded"
              />

              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit Review
              </button>
            </form>
          </div>

          {/* REVIEWS LIST */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Student Reviews
            </h2>

            {reviews.length === 0 ? (
              <p>No reviews yet</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            )}
          </div>
        </div>

        {/* SIDEBAR INFO (Udemy style) */}
        <div className="space-y-4">

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg">This Material Includes</h3>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>📄 PDF File</li>
              <li>📊 Notes & Examples</li>
              <li>📥 Download Access</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg">Stats</h3>
            <p>Views: {material.views || 0}</p>
            <p>Downloads: {material.downloads || 0}</p>
            <p>Rating: {material.averageRating || 0}/5</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MaterialDetail;