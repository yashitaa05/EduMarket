import { useEffect, useState } from "react";
import { getMaterials } from "../api/material";
import MaterialCard from "../components/materialcard";
import SearchBar from "../components/searchbar";

const Home = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Actual search query sent to backend
  const [search, setSearch] = useState("");

  // Input field value
  const [searchInput, setSearchInput] =
    useState("");

  // Filter
  const [category, setCategory] =
    useState("");

  // Sort
  const [sort, setSort] =
    useState("");

  // Pagination
  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {
    fetchMaterials();
  }, [
    search,
    category,
    sort,
    page,
  ]);

  const fetchMaterials =
    async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getMaterials({
            search,
            category,
            sort,
            page,
          });

        setMaterials(
          data.materials || []
        );

        setTotalPages(
          data.totalPages || 1
        );

      } catch (error) {
        console.error(error);

        setError(
          "Failed to fetch materials"
        );
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
      <div className="flex justify-center py-20">
        <div className="text-xl font-semibold">
          Loading materials...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Study Materials
      </h1>

      {/* Search */}

      <SearchBar
        search={searchInput}
        setSearch={setSearchInput}
        onSearch={handleSearch}
      />

      {/* Filters */}

      <div className="flex flex-wrap gap-4 mb-6">

        <select
          value={category}
          onChange={(e) => {
            setCategory(
              e.target.value
            );
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">
            All Categories
          </option>

          <option value="Programming">
            Programming
          </option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="DBMS">
            DBMS
          </option>

          <option value="DSA">
            DSA
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(
              e.target.value
            );
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">
            Latest
          </option>

          <option value="downloads">
            Most Downloaded
          </option>

          <option value="rating">
            Highest Rated
          </option>
        </select>

        <button
          onClick={clearFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>

      </div>

      {/* Results Count */}

      <p className="text-gray-600 mb-4">
        Found {materials.length} materials
      </p>

      {/* Empty State */}

      {materials.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-xl">
            No materials found
          </h2>
        </div>
      ) : (
        <>
          {/* Materials Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {materials.map(
              (material) => (
                <MaterialCard
                  key={
                    material._id
                  }
                  material={
                    material
                  }
                />
              )
            )}

          </div>

          {/* Pagination */}

          <div className="flex justify-center gap-2 mt-8 flex-wrap">

            {[...Array(totalPages)].map(
              (_, index) => (
                <button
                  key={index}
                  disabled={
                    page ===
                    index + 1
                  }
                  onClick={() =>
                    setPage(
                      index + 1
                    )
                  }
                  className={`px-4 py-2 border rounded transition ${
                    page ===
                    index + 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}

          </div>
        </>
      )}

    </div>
  );
};

export default Home;