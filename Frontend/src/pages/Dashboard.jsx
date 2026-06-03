import { useEffect, useState } from "react";
import { getCreatorStats } from "../api/dashboard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [topMaterials, setTopMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const data = await getCreatorStats();

      setStats(data.stats);
      setTopMaterials(data.topMaterials || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-red-500 text-2xl">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8">
        Creator Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Uploads */}
        <div className="bg-white border rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm uppercase">
            Total Uploads
          </h3>

          <p className="text-4xl font-bold mt-2">
            {stats?.totalUploads || 0}
          </p>
        </div>

        {/* Views */}
        <div className="bg-white border rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm uppercase">
            Total Views
          </h3>

          <p className="text-4xl font-bold mt-2">
            {stats?.totalViews || 0}
          </p>
        </div>

        {/* Downloads */}
        <div className="bg-white border rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm uppercase">
            Total Downloads
          </h3>

          <p className="text-4xl font-bold mt-2">
            {stats?.totalDownloads || 0}
          </p>
        </div>

        {/* Rating */}
        <div className="bg-white border rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm uppercase">
            Average Rating
          </h3>

          <p className="text-4xl font-bold mt-2">
            {stats?.avgRating
              ? stats.avgRating.toFixed(1)
              : "0.0"}
          </p>
        </div>
      </div>

      {/* Top Materials */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">
          Top Performing Materials
        </h2>

        {topMaterials.length === 0 ? (
          <div className="border rounded-lg p-6 bg-gray-50">
            <p className="text-gray-600">
              No materials uploaded yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {topMaterials.map((material) => (
              <div
                key={material._id}
                className="border rounded-lg shadow-sm p-5"
              >
                <h3 className="text-xl font-semibold">
                  {material.title}
                </h3>

                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-gray-500">
                      Downloads
                    </p>

                    <p className="font-bold">
                      {material.downloads || 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Views
                    </p>

                    <p className="font-bold">
                      {material.views || 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Rating
                    </p>

                    <p className="font-bold">
                      {material.averageRating || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;