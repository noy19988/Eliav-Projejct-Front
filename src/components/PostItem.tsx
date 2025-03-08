import React from "react";
import { Post, deletePost } from "../services/post-client";
import "../styles/postItem.css";

interface PostItemProps {
  post: Post;
  onDelete: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
        onDelete();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="post-item">
      {post.imageUrl && <img src={post.imageUrl} alt={post.recipeTitle} className="post-image" />}
      <div className="post-content">
        <h2 className="post-title">{post.recipeTitle}</h2>
        <p className="post-category">Category: {post.category.join(", ")}</p>
        <p className="post-difficulty">Difficulty: {post.difficulty}</p>
        <p className="post-prep-time">Prep Time: {post.prepTime} min</p>

        <h3>Ingredients:</h3>
        <ul>
          {post.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <ol>
          {post.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>

        <div className="post-actions">
          <button className="like-btn">❤️ Like</button>
          <button className="save-btn">💾 Save</button>
          <button className="delete-btn" onClick={handleDelete}>🗑 Delete</button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
