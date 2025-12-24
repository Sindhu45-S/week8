import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      const localPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
      const localPost = localPosts.find((p) => p.id.toString() === id);

      if (localPost) {
        setPost(localPost);
        return;
      }

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Failed to load post:", err);
      }
    };

    loadPost();
  }, [id]);

  if (!post) {
    return (
      <>
        <Navbar />
        <p className="loading-text">Loading post...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="post-detail-container">
        <div className="postcard-detail">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
