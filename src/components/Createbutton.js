import { useState, useEffect } from "react";

function Createbutton({ addPost, editPost, editingPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    if (editingPost) {
      editPost({ id: editingPost.id, title, body });
    } else {
      addPost({ title, body });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>
        {editingPost ? "✏️ Edit Post" : "➕ Create Post"}
      </h2>

      <div style={{ marginBottom: "12px" }}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Enter post title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Content</label>
        <textarea
          value={body}
          placeholder="Enter post content"
          onChange={(e) => setBody(e.target.value)}
          rows="4"
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 15px",
          background: editingPost ? "#f59e0b" : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {editingPost ? "Update Post" : "Create Post"}
      </button>
      <Link to="/" className="nav-link">Home</Link>
    </form>
  );
}

export default Createbutton;

