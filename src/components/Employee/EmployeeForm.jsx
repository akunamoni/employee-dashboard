import { useState, useEffect } from "react";
import { useEmployees } from "../../context/EmployeeContext.jsx";

/* Utility: Convert image to Base64 */
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function EmployeeForm({ editing, setEditing }) {
  const { addEmployee, updateEmployee } = useEmployees();

  const initialForm = {
    name: "",
    gender: "",
    dob: "",
    state: "",
    image: "",
    isActive: true,
  };

  const [form, setForm] = useState(initialForm);

  /*  Populate form when editing */
  useEffect(() => {
    if (editing) {
      setForm({
        ...initialForm,
        ...editing,
      });
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.gender || !form.dob || !form.state) {
      alert("Please fill all required fields");
      return;
    }

    editing ? updateEmployee(form) : addEmployee(form);

    setForm(initialForm);
    setEditing(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-4 sm:p-6"
    >
      <h2 className="text-lg font-semibold mb-4">
        {editing ? "Edit Employee" : "Add Employee"}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Gender
          </label>
          <select
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) =>
              setForm({ ...form, dob: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">
            State
          </label>
          <select
            value={form.state}
            onChange={(e) =>
              setForm({ ...form, state: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select State</option>
            <option>Telangana</option>
            <option>Karnataka</option>
            <option>Andhra Pradesh</option>
            <option>Maharashtra</option>
          </select>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const base64 = await toBase64(file);
            setForm((prev) => ({
              ...prev,
              image: base64,
            }));
          }}
          className="block w-full text-sm"
        />
      </div>

      {/* Image Preview */}
      {form.image && (
        <div className="mt-4 flex items-center gap-4">
          <img
            src={form.image}
            alt="Preview"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <span className="text-sm text-gray-500">
            Image Preview
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editing ? "Update Employee" : "Add Employee"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm(initialForm);
            }}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
