function FilterBar({ filter, setFilter }) {
  return (
    <div className="filters">
      <button
        className={filter === "All" ? "colored" : ""}
        onClick={() => setFilter("All")}
      >
        All
      </button>

      <button
        className={filter === "Completed" ? "colored" : ""}
        onClick={() => setFilter("Completed")}
      >
        Completed
      </button>

      <button
        className={filter === "Active" ? "colored" : ""}
        onClick={() => setFilter("Active")}
      >
        Active
      </button>
    </div>
  );
}

export default FilterBar;