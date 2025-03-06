import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/api-client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostList from "../components/PostList";
import "../styles/home.css";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const userData = await getUserDetails(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="home-container">
      <Navbar user={user} /> {/* מעביר את שם המשתמש לנווט */}
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
