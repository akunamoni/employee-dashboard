import { useEmployees } from "../../context/EmployeeContext.jsx";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";

export default function EmployeeTable({ employees, setEditing }) {
  const { deleteEmployee, toggleStatus } = useEmployees();

  /* Print Single Employee */
  const handlePrint = (emp) => {
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Employee Details</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .card {
              max-width: 520px;
              margin: auto;
              border: 1px solid #ddd;
              padding: 24px;
              border-radius: 12px;
              text-align: center;
            }
            img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              object-fit: cover;
              margin-bottom: 16px;
            }
            h2 { margin-bottom: 12px; }
            p {
              margin: 6px 0;
              font-size: 14px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${emp.image}" />
            <h2>${emp.name}</h2>
            <p><strong>ID:</strong> ${emp.id}</p>
            <p><strong>Gender:</strong> ${emp.gender}</p>
            <p><strong>DOB:</strong> ${emp.dob}</p>
            <p><strong>State:</strong> ${emp.state}</p>
            <p><strong>Status:</strong> ${
              emp.isActive ? "Active" : "Inactive"
            }</p>
          </div>

          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-center">Profile</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">DOB</th>
            <th className="p-3 text-left">State</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                className="text-center py-6 text-gray-500"
              >
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{emp.id}</td>

                <td className="p-3 text-center">
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full mx-auto object-cover"
                  />
                </td>

                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.gender}</td>
                <td className="p-3">{emp.dob}</td>
                <td className="p-3">{emp.state}</td>

                {/* Status Toggle */}
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={emp.isActive}
                    onChange={() => toggleStatus(emp.id)}
                    className="accent-blue-600 cursor-pointer"
                  />
                </td>

                {/* Icon Actions */}
                <td className="p-3">
                  <div className="flex justify-center gap-4 text-lg">
                    <button
                      title="Edit"
                      onClick={() => setEditing(emp)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>

                    <button
                      title="Print"
                      onClick={() => handlePrint(emp)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaPrint />
                    </button>

                    <button
                      title="Delete"
                      onClick={() =>
                        window.confirm("Delete employee?") &&
                        deleteEmployee(emp.id)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
