import { useEffect, useState } from "react";
import { getMyMaterials } from "../api/creator";

const MyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
  try {
    const data = await getMyMaterials();

    console.log(
      "FULL RESPONSE:",
      JSON.stringify(data, null, 2)
    );

    console.log("SUCCESS:", data.success);
    console.log("DATA:", data.data);

    setMaterials(
      Array.isArray(data.data)
        ? data.data
        : []
    );

  } catch (error) {
    console.log("ERROR:", error);

  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <h2 className="text-center mt-10">
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Materials
      </h1>

      {materials.length === 0 ? (
        <div className="text-center text-gray-500">
          No materials found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials?.map((material) => (
            <div
              key={material._id}
              className="border rounded-lg p-4 shadow"
            >
              <img
                src={material.thumbnail}
                alt={material.title}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="font-semibold mt-3">
                {material.title}
              </h2>

              <p>
                Views: {material.views || 0}
              </p>

              <p>
                Downloads: {material.downloads || 0}
              </p>

              <p>
                Rating: {material.averageRating || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMaterials;