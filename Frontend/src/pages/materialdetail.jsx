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
    fetchMaterial();
    fetchReviews();
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
      window.open(data.pdfUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(id);
      alert("Added to wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReview(id, {
        rating,
        comment,
      });

      setComment("");

      fetchReviews();
      fetchMaterial();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>Loading Material...</h2>;
  }

  if (!material) {
    return <h2>Material not found</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Thumbnail */}
      <img
        src={material.thumbnail}
        alt={material.title}
        className="w-full h-96 object-cover rounded-lg"
      />

      {/* Material Info */}
      <h1 className="text-4xl font-bold mt-6">
        {material.title}
      </h1>

      <p className="mt-3 text-gray-600">
        {material.description}
      </p>

      <div className="mt-4">
        <strong>Category:</strong>{" "}
        {material.category}
      </div>

      <div>
        <strong>Views:</strong>{" "}
        {material.views}
      </div>

      <div>
        <strong>Downloads:</strong>{" "}
        {material.downloads}
      </div>

      <div>
        <strong>Rating:</strong>{" "}
        {material.averageRating} ⭐
      </div>

      <div>
        <strong>Reviews:</strong>{" "}
        {material.numReviews}
      </div>

      {/* Creator */}
      <div className="mt-4">
        <strong>Creator:</strong>{" "}
        {material.creator?.name}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleAddToWishlist}
          className="bg-pink-600 text-white px-5 py-2 rounded"
        >
          ❤️ Save
        </button>

        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      {/* Review Form */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Add Review
        </h2>

        <form
          onSubmit={handleReviewSubmit}
          className="space-y-4 mt-4"
        >
          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            className="border p-2 rounded"
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Write your review..."
            className="border p-2 w-full rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MaterialDetail;