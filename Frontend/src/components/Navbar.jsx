import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 p-4 border-b bg-white shadow-sm sticky top-0 z-40">
      <Link to="/home" className="font-semibold text-lg text-slate-900">
        Marketplace
      </Link>

      <div className="flex flex-wrap gap-3 items-center">
        <Link
          to="/home"
          className="text-slate-600 hover:text-indigo-600 transition"
        >
          Browse
        </Link>

        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              className="text-slate-600 hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>

            {user?.role === "student" && (
              <Link
                to="/wishlist"
                className="text-slate-600 hover:text-indigo-600 transition"
              >
                Wishlist
              </Link>
            )}

            {(user?.role === "creator" || user?.role === "admin") && (
              <>
                <Link
                  to="/upload"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Upload
                </Link>
                <Link
                  to="/my-materials"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  My Materials
                </Link>
              </>
            )}
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="text-slate-600 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-slate-600 hover:text-indigo-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {isAuthenticated && (
        <button
          onClick={logout}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;