import { useEffect, useState } from "react";
import { getMaterials } from "../api/material";
import MaterialCard from "../components/materialcard";
import SearchBar from "../components/searchbar";

const Home = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMaterials();
  }, [search, category, sort, page]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMaterials({
        search,
        category,
        sort,
        page,
      });

      setMaterials(data.materials || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch materials");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setCategory("");
    setSort("");
    setPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading materials...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📚 Study Materials
        </h1>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <SearchBar
            search={searchInput}
            setSearch={setSearchInput}
            onSearch={handleSearch}
          />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap gap-4 items-center">

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded-lg text-sm"
          >
            <option value="">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="DBMS">DBMS</option>
            <option value="DSA">DSA</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded-lg text-sm"
          >
            <option value="">Latest</option>
            <option value="downloads">Most Downloaded</option>
            <option value="rating">Highest Rated</option>
          </select>

          <button
            onClick={clearFilters}
            className="ml-auto bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Results */}
        <p className="text-gray-600 mb-4">
          Found <span className="font-semibold">{materials.length}</span> materials
        </p>

        {/* Empty State */}
        {materials.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-700">
              No materials found
            </h2>
            <p className="text-gray-500 mt-2">
              Try changing filters or search terms
            </p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {materials.map((material) => (
                <MaterialCard
                  key={material._id}
                  material={material}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  disabled={page === index + 1}
                  className={`px-4 py-2 rounded-lg border transition text-sm ${
                    page === index + 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Home;