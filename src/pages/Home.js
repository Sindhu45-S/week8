import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("localPosts")) || [];

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );
        const data = await res.json();
        setPosts([...savedPosts, ...data]);
      } catch {
        setPosts(savedPosts);
      }
    };

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    const postWithId = { id: Date.now(), ...newPost };
    const updatedPosts = [postWithId, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem(
      "localPosts",
      JSON.stringify(updatedPosts.filter((p) => p.id > 100000))
    );
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem(
      "localPosts",
      JSON.stringify(updatedPosts.filter((p) => p.id > 100000))
    );
  };

  // ✏️ EDIT POST
  const handleEdit = (id, updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem(
      "localPosts",
      JSON.stringify(updatedPosts.filter((p) => p.id > 100000))
    );
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={setSearch} />

      <div style={{ maxWidth: "700px", margin: "30px auto" }}>
        <h1>My Blog</h1>

        <CreatePost addPost={addPost} />

        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={() => handleDelete(post.id)}
            onEdit={handleEdit} // ✏️ PASS EDIT HANDLER
          />
        ))}
      </div>
    </>
  );
}

export default Home;
