import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <h1 className="text-lg font-semibold">
        Employee Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.username}
        </span>

        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-1.5 rounded-lg hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
