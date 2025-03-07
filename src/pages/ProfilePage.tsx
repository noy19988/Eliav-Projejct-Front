import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUser, deleteUser } from "../services/api-client";
import { FaUser, FaTrash, FaUpload } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ _id: string; username: string; email: string; imgUrl?: string } | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    getUserDetails(userId)
      .then((data) => {
        setUser(data);
        setNewUsername(data.username);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      });
  }, [navigate]);

  const handleUpdate = async () => {
    if (!user) return;
  
    const formData = new FormData();
    formData.append("username", newUsername);
  
    if (newImage) {
      console.log("✅ קובץ נמצא, מוסיפים אותו ל-FormData:", newImage);
      formData.append("profileImage", newImage); 
    } else {
      console.warn("⚠️ אין קובץ להעלאה!");
    }
  
    console.log("🔹 Sending FormData to Backend:");
    for (const pair of formData.entries()) {
      console.log(`   ➜ ${pair[0]}:`, pair[1]); 
    }
  
    try {
      const updatedUser = await updateUser(user._id, formData);
      if (updatedUser) {
        setUser(updatedUser);
        alert("✅ Profile updated successfully!");
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };
  
  


  const handleDelete = async () => {
    if (!user) return;
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await deleteUser(user._id);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/signup");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
        
        {/* תמונת פרופיל */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          {user?.imgUrl ? (
            <img 
            src={user.imgUrl.startsWith("http") ? user.imgUrl : `http://localhost:3000${user.imgUrl}`} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover shadow" 
          />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-600 text-5xl" />
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
            <FaUpload />
            <input type="file" className="hidden" onChange={(e) => e.target.files && e.target.files[0] && (console.log("✅ קובץ נבחר:", e.target.files[0]), setNewImage(e.target.files[0]))} />
          </label>
        </div>


        {/* טופס עדכון */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        {/* כפתור שמירה */}
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition w-full mb-2"
        >
          Save Changes
        </button>

        {/* כפתור מחיקה */}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition w-full flex items-center justify-center gap-2"
        >
          <FaTrash /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
