import { useState } from "react";
import { API } from "../api";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { token, fetchPosts, posts, user } = useOutletContext();
  const { postId } = useParams();

  const post = posts.find((_post) => _post.id === postId);

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleEditPost(e) {
    setError("");
    e.preventDefault();
    const res = await fetch(`${API}/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    fetchPosts();
    navigate("/");
  }

  return !token ? (
    <h2> Please login to edit posts.</h2>
  ) : (
    <div>
      <form className="post-form" onSubmit={handleEditPost}>
        <div>
          <input
            className=""
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />
        </div>
        <div className="">
          <textarea
            className=""
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Text"
          />
        </div>
        <div className="">
          <button> Update Post</button>
        </div>

        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
}
