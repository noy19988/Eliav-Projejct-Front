import React, { useState } from "react";
import "../styles/postCreate.css"; // קובץ CSS נפרד לעיצוב

interface PostCreatePageProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostCreatePage: React.FC<PostCreatePageProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState("");

  if (!isOpen) return null; // אם המודאל סגור, לא מציגים כלום

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Post</h2>
        <textarea
          placeholder="Write your post here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="btn save-btn" onClick={() => alert("Post Created!")}>
            Post
          </button>
          <button className="btn close-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreatePage;
