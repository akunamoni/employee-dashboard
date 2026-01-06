import { createContext, useContext, useEffect, useState } from "react";
import employeesMock from "../data/employees.mock.js";

const EmployeeContext = createContext();
const STORAGE_KEY = "employees";

//  Generate next 5-digit ID
const getNextEmployeeId = (employees) => {
  const maxId = employees.reduce(
    (max, emp) => Math.max(max, Number(emp.id)),
    10000
  );
  return maxId + 1;
};

export const EmployeeProvider = ({ children }) => {
  // Load from localStorage OR fallback to mock data
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : employeesMock;
  });

  //  Persist employees to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  //  Add Employee
  const addEmployee = (emp) => {
    setEmployees((prev) => [
      ...prev,
      {
        ...emp,
        id: getNextEmployeeId(prev),
        isActive: emp.isActive ?? true,
      },
    ]);
  };

  //  Update Employee
  const updateEmployee = (emp) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === emp.id ? emp : e))
    );
  };

  //  Delete Employee
  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  //  Toggle Active / Inactive
  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, isActive: !e.isActive } : e
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleStatus,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
