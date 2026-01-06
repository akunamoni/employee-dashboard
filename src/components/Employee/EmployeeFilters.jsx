import { useEffect, useState } from "react";

export default function EmployeeFilters({ filters, setFilters }) {
  const [search, setSearch] = useState(filters.name);

  /* Debounce search input */
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, name: search }));
    }, 300);

    return () => clearTimeout(timer);
  }, [search, setFilters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/*  Search by Name */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/*  Gender Filter */}
      <select
        value={filters.gender}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            gender: e.target.value,
          }))
        }
        className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/*  Status Filter */}
      <select
        value={filters.status}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            status: e.target.value,
          }))
        }
        className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">All Status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    </div>
  );
}
