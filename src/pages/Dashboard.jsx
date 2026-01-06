import { useState, useMemo } from "react";
import { useEmployees } from "../context/EmployeeContext";
import Header from "../components/Layout/Header";
import EmployeeForm from "../components/Employee/EmployeeForm";
import EmployeeTable from "../components/Employee/EmployeeTable";
import EmployeeFilters from "../components/Employee/EmployeeFilters";

export default function Dashboard() {
  const { employees } = useEmployees();
  const [editing, setEditing] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    status: "",
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchName = emp.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());

      const matchGender =
        !filters.gender || emp.gender === filters.gender;

      const matchStatus =
        !filters.status ||
        String(emp.isActive) === filters.status;

      return matchName && matchGender && matchStatus;
    });
  }, [employees, filters]);

  const totalCount = employees.length;
  const activeCount = employees.filter((e) => e.isActive).length;
  const inactiveCount = totalCount - activeCount;

  return (
    <>
      {/* HEADER */}
      <Header />

      {/*  PAGE CONTENT */}
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Employee Management Dashboard
        </h2>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Total Employees</p>
            <p className="text-2xl font-semibold">{totalCount}</p>
          </div>

          <div className="bg-green-100 shadow rounded-xl p-4 text-center">
            <p className="text-green-700 text-sm">Active</p>
            <p className="text-2xl font-semibold">{activeCount}</p>
          </div>

          <div className="bg-red-100 shadow rounded-xl p-4 text-center">
            <p className="text-red-700 text-sm">Inactive</p>
            <p className="text-2xl font-semibold">{inactiveCount}</p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white shadow rounded-xl p-4 mb-6">
          <EmployeeForm editing={editing} setEditing={setEditing} />
        </div>

        {/* TABLE + FILTERS */}
        <div className="bg-white shadow rounded-xl p-4">
          <EmployeeFilters
            filters={filters}
            setFilters={setFilters}
          />

          <EmployeeTable
            employees={filteredEmployees}
            setEditing={setEditing}
          />
        </div>
      </div>
    </>
  );
}
