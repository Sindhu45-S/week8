import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/postCard.css";

function PostCard({ post, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSave = () => {
    onEdit(post.id, { title, body });
    setIsEditing(false);
  };

  return (
    <div className="post-card">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />

          <button className="btn-edit" onClick={handleSave}>Save</button>
          <button className="btn-delete" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          {/* 👇 CLICKABLE TITLE */}
          <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
            <h3>{post.title}</h3>
          </Link>

          <p>{post.body}</p>

          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="btn-delete" onClick={onDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default PostCard;
