import { useEffect, useState } from "react";
import { getCreatorStats } from "../api/dashboard";
import { useAuth } from "../context/Authcontext";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [topMaterials, setTopMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    if (user.role === "creator" || user.role === "admin") {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getCreatorStats();
      setStats(data.stats || {});
      setTopMaterials(data.topMaterials || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard. Please refresh or contact support.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || (user && !user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg text-slate-600">Loading user settings...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-semibold text-slate-700">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  if (error && (user.role === "creator" || user.role === "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-red-700">{error}</h2>
        </div>
      </div>
    );
  }

  if (user.role === "student") {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Student Dashboard</h1>
          <p className="text-slate-600 mb-6">
            Welcome back, <span className="font-semibold">{user.name}</span>! Explore materials, save favorites, and track your wishlist.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
              <h2 className="text-xl font-semibold mb-2">Browse Study Materials</h2>
              <p className="text-slate-600 mb-4">
                Visit the home page to search and filter the latest uploads.
              </p>
              <a
                href="/home"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                Go to Materials
              </a>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
              <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
              <p className="text-slate-600">Email: {user.email}</p>
              <p className="text-slate-600">Role: {user.role}</p>
              <p className="text-slate-600 mt-3">Use the Wishlist page to save important items.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">
          {user.role === "admin" ? "Admin Dashboard" : "Creator Dashboard"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border rounded-3xl shadow p-6">
            <h3 className="text-gray-500 text-sm uppercase">Total Uploads</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalUploads || 0}</p>
          </div>
          <div className="bg-white border rounded-3xl shadow p-6">
            <h3 className="text-gray-500 text-sm uppercase">Total Views</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalViews || 0}</p>
          </div>
          <div className="bg-white border rounded-3xl shadow p-6">
            <h3 className="text-gray-500 text-sm uppercase">Total Downloads</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalDownloads || 0}</p>
          </div>
          <div className="bg-white border rounded-3xl shadow p-6">
            <h3 className="text-gray-500 text-sm uppercase">Average Rating</h3>
            <p className="text-4xl font-bold mt-2">
              {stats.avgRating ? stats.avgRating.toFixed(1) : "0.0"}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Top Performing Materials</h2>

          {topMaterials.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
              No materials uploaded yet.
            </div>
          ) : (
            <div className="space-y-4">
              {topMaterials.map((material) => (
                <div key={material._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">{material.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-slate-600">
                    <div>
                      <p className="text-sm">Downloads</p>
                      <p className="font-bold text-slate-900">{material.downloads || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm">Views</p>
                      <p className="font-bold text-slate-900">{material.views || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm">Rating</p>
                      <p className="font-bold text-slate-900">{material.averageRating || 0}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;