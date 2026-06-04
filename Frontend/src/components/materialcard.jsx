import { Link } from "react-router-dom";

const MaterialCard = ({ material }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden hover:-translate-y-1">

      {/* Thumbnail */}
      <div className="relative">
        <img
          src={material.thumbnail}
          alt={material.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {material.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {material.title}
        </h2>

        {/* Stats Row */}
        <div className="flex justify-between text-sm text-gray-600 mt-3">

          <div>
            ⭐ {material.averageRating || 0}
          </div>

          <div>
            👁 {material.views || 0}
          </div>

          <div>
            ⬇ {material.downloads || 0}
          </div>

        </div>

        {/* Button */}
        <Link
          to={`/material/${material._id}`}
          className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default MaterialCard;