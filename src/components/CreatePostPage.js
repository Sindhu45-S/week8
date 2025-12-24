import Navbar from "../components/Navbar"
import CreatePost from "../components/CreatePost"
import { useNavigate } from "react-router-dom"

function CreatePostPage() {
  const navigate = useNavigate()

  const handleAddPost = (post) => {
    const savedPosts = JSON.parse(localStorage.getItem("localPosts")) || []
    const postWithId = { id: Date.now(), ...post }
    localStorage.setItem(
      "localPosts",
      JSON.stringify([postWithId, ...savedPosts])
    )
    navigate("/") // go back to Home
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "30px auto" }}>
        <h1>Create New Post</h1>
        <CreatePost addPost={handleAddPost} />
      </div>
    </>
  )
}

export default CreatePostPage
