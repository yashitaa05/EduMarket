import { useEffect, useState } from "react";
import {
  getWishlist,
  removeFromWishlist,
} from "../api/wishlist";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();

      setWishlist(data.wishlist || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (
    materialId
  ) => {
    try {
      await removeFromWishlist(
        materialId
      );

      setWishlist((prev) =>
        prev.filter(
          (item) =>
            item._id !== materialId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h2>Loading wishlist...</h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2>No saved materials</h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(
            (material) => (
              <div
                key={material._id}
                className="border rounded-lg p-4"
              >
                <img
                  src={
                    material.thumbnail
                  }
                  alt={
                    material.title
                  }
                  className="w-full h-40 object-cover rounded"
                />

                <h2 className="text-xl font-semibold mt-3">
                  {material.title}
                </h2>

                <Link
                  to={`/material/${material._id}`}
                  className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View
                </Link>

                <button
                  onClick={() =>
                    handleRemove(
                      material._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded ml-3"
                >
                  Remove
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;