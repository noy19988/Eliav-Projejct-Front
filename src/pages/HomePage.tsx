import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/api-client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostList from "../components/PostList";
import PostCreatePage from "../pages/PostCreatePage"; // ✅ תיקון נתיב הקובץ
import "../styles/home.css";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false); // בקרה על פתיחת/סגירת מודאל

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      console.log("📌 Checking userId:", userId); // ✅ בדיקה האם ה-userId קיים

      if (!userId) {
        console.log("❌ No userId found, redirecting to /login");
        navigate("/login");
        return;
      }

      try {
        const userData = await getUserDetails(userId);
        console.log("✅ User data fetched:", userData);
        setUser(userData);
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.log("❌ Removing credentials, redirecting to /login");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="home-container">
      <Navbar user={user} />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          {/* כפתור יצירת פוסט */}
          <button className="create-post-btn" onClick={() => setIsPostModalOpen(true)}>
            Create Post
          </button>

          {/* קומפוננטת יצירת פוסט */}
          <PostCreatePage isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />

          {/* רשימת פוסטים */}
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
