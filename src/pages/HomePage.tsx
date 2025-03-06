import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/api-client";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login"); // אם אין משתמש מחובר, חזור להתחברות
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
      <h1>Welcome, {user ? user.username : "Guest"}!</h1>
      <p>This is your home page.</p>
      <button onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      }}>Logout</button>
    </div>
  );
}

export default HomePage;
