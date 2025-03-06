import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/popular">🔥 Popular</Link></li>
        <li><Link to="/games">🎮 Games</Link></li>
        <li><Link to="/movies">🎬 Movies</Link></li>
        <li><Link to="/technology">💻 Technology</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
