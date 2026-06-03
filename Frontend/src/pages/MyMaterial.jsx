import { useEffect, useState } from "react";
import { getMyMaterials } from "../api/creator";

const MyMaterials = () => {
  const [materials, setMaterials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials =
    async () => {
      try {
        const data =
          await getMyMaterials();

        setMaterials(
          data.materials
        );

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Materials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {materials.map(
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
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="font-semibold mt-3">
                {
                  material.title
                }
              </h2>

              <p>
                Views:
                {
                  material.views
                }
              </p>

              <p>
                Downloads:
                {
                  material.downloads
                }
              </p>

              <p>
                Rating:
                {
                  material.averageRating
                }
              </p>
            </div>
          )
        )}

      </div>

    </div>
  );
};

export default MyMaterials;