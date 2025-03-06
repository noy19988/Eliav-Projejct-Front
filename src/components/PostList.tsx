import React from "react";
import "../styles/home.css";

const posts = [
  { id: 1, title: "First Post", content: "This is the first post" },
  { id: 2, title: "Second Post", content: "This is the second post" },
];

const PostList: React.FC = () => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};
 
export default PostList;
