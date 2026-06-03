const SearchBar = ({
  search,
  setSearch,
  onSearch,
}) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search materials..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-2 flex-1 rounded"
      />

      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;