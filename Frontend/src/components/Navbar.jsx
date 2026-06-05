import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 p-4 border-b bg-white shadow-sm sticky top-0 z-40">

      {/* LOGO */}
      <Link to="/home" className="font-semibold text-lg text-slate-900">
        Marketplace
      </Link>

      {/* NAV LINKS */}
      <div className="flex flex-wrap gap-3 items-center">

        {/* PUBLIC */}
        <Link
          to="/home"
          className="text-slate-600 hover:text-indigo-600 transition"
        >
          Browse
        </Link>

        {/* AUTHENTICATED USERS */}
        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              className="text-slate-600 hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>

            {/* STUDENT ONLY */}
            {user?.role === "student" && (
              <>
                <Link
                  to="/wishlist"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Wishlist
                </Link>
              </>
            )}

            {/* CREATOR ONLY */}
            {user?.role === "creator" && (
              <>
                <Link
                  to="/upload-material"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Upload Material
                </Link>

                <Link
                  to="/my-materials"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  My Materials
                </Link>
              </>
            )}

            {/* ADMIN ONLY */}
            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Admin Panel
                </Link>

                <Link
                  to="/admin/users"
                  className="text-slate-600 hover:text-indigo-600 transition"
                >
                  Manage Users
                </Link>
              </>
            )}
          </>
        )}

        {/* AUTH LINKS */}
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

      {/* LOGOUT */}
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