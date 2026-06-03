import { Link } from "react-router-dom";

const MaterialCard = ({ material }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <img
        src={material.thumbnail}
        alt={material.title}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-3">
        {material.title}
      </h2>

      <p className="text-gray-600">
        {material.category}
      </p>

      <div className="mt-2">
        {material.averageRating || 0}
      </div>

      <div>
        {material.views || 0}
      </div>

      <div>
        {material.downloads || 0}
      </div>

      <Link
        to={`/material/${material._id}`}
        className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default MaterialCard;