import { FaUser, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Navbar = ({ user }: { user: { username: string } | null }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">LOGO</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <FaSearch className="search-icon" />
      </div>
      <div className="user-info">
        <span className="welcome-text">Welcome, {user ? user.username : "Guest"}!</span>
        <div className="profile-icon">
          <Link to="/profile">
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
