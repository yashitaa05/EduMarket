import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link to="/">Home</Link>

      <Link to="/wishlist">
        Wishlist
      </Link>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/login">
        Login
      </Link>

      <Link to="/my-materials">
      My Materials
      </Link>

      <Link to="/upload">
      Upload
      </Link>

      

    </nav>
  );
};

export default Navbar;