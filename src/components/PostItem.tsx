import React, { useEffect, useState, useCallback } from "react";
import { Post, deletePost } from "../services/post-client";
import { addComment, getCommentsByPost, Comment } from "../services/comment-client";
import "../styles/postItem.css";
import { FaHeart, FaComment, FaTrash, FaEllipsisV, FaEdit} from "react-icons/fa";

interface PostItemProps {
  post: Post;
  onDelete: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const userId = localStorage.getItem("userId");
  const isOwner = userId === post.authorId._id;

  const fetchComments = useCallback(async () => {
    try {
      const fetchedComments = await getCommentsByPost(post._id);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [post._id]);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, fetchComments]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const newComment = await addComment(post._id, commentText);
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeletePost = async () => {
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
      <div className="post-header">
        <div className="post-author">
          <img src={post.authorId.imgUrl || "https://example.com/default-profile.png"} alt={post.authorId.username} className="author-img" />
          <span className="author-name">{post.authorId.username}</span>
        </div>
        {isOwner && (
          <div className="post-options">
            <button className="options-btn" onClick={() => setShowDropdown(!showDropdown)}>
              <FaEllipsisV />
            </button>
            {showDropdown && (
              <ul className="dropdown-menu" onClick={() => setShowDropdown(false)}>
                <li onClick={handleDeletePost}><FaTrash /> Delete Post</li>
                <li><FaEdit /> Edit Post</li>
                </ul>
            )}
          </div>
        )}
      </div>

      <div className="post-details">
        <h2 className="post-title">{post.recipeTitle}</h2>
        <p className="post-category">Category: {post.category.join(", ")}</p>
        <p className="post-difficulty">Difficulty: {post.difficulty}</p>
        <p className="post-prep-time">Prep Time: {post.prepTime} min</p>
      </div>

      {post.imageUrl && <img src={post.imageUrl} alt={post.recipeTitle} className="post-image" />}

      <div className="post-actions">
        <button className="like-btn"><FaHeart /> Like</button>
        <button className="comment-btn" onClick={() => setShowComments(!showComments)}><FaComment /> Comment</button>
      </div>

      {showComments && (
        <div className="comments-section">
          <textarea placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
          <button className="submit-comment" onClick={handleAddComment}>Post</button>
          <div className="previous-comments">
            {comments.length > 0 ? (
              comments.map(comment => (
                <p key={comment._id}><strong>{comment.author.username}:</strong> {comment.content}</p>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
