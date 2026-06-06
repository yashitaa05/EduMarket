import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";

import {
  getApprovedMaterials,
  getWishlist,
  addToWishlist,
  downloadMaterial,
} from "../api/student";

const StudentDashboard = () => {
  const { user } = useAuth();

  const [materials, setMaterials] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- LOAD DATA ----------------
  const loadData = async () => {
    try {
      setLoading(true);

      const [materialsData, wishlistData] = await Promise.all([
        getApprovedMaterials(),
        getWishlist(),
      ]);

      setMaterials(materialsData);
      setWishlist(wishlistData);
    } catch (err) {
      console.log(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---------------- WISHLIST HANDLER ----------------
  const handleWishlist = async (materialId) => {
    try {
      await addToWishlist(materialId);
      const updatedWishlist = await getWishlist();
      setWishlist(updatedWishlist);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Student Dashboard
        </h1>
        <p className="text-gray-500">
          Welcome back,{" "}
          <span className="font-semibold">{user?.name}</span>
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-indigo-600">
            {materials.length}
          </h3>
          <p className="text-gray-500">Available Materials</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-pink-500">
            {wishlist.length}
          </h3>
          <p className="text-gray-500">Wishlist Items</p>
        </div>
      </div>

      {/* MATERIAL LIST */}
      <h2 className="text-xl font-semibold mb-4">
        Browse Materials
      </h2>

      {materials.length === 0 ? (
        <p className="text-gray-500">No approved materials found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {materials.map((m) => (
            <div
              key={m._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{m.title}</h3>

              <p className="text-gray-500 text-sm mt-2">
                {m.description}
              </p>

              <span className="inline-block mt-3 text-xs bg-gray-100 px-2 py-1 rounded">
                {m.category}
              </span>

              <div className="flex justify-between items-center mt-5">
                {/* DOWNLOAD */}
                <button
                  onClick={() => downloadMaterial(m._id)}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  ⬇ Download
                </button>

                {/* WISHLIST */}
                <button
                  onClick={() => handleWishlist(m._id)}
                  className="text-sm bg-pink-500 text-white px-3 py-1 rounded"
                >
                  ❤️ Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;