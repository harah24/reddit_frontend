import { useState } from "react";
import { API } from "../api";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function NewPosts() {
  const { token, fetchPosts, fetchSubreddits, subreddits } = useOutletContext();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [selectSubreddit, setSelectSubreddit] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();
    if (!selectSubreddit) {
      setError("Please choose a category");
      return;
    }
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
        subredditId: selectSubreddit,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }
    setText("");
    setTitle("");
    fetchPosts();
    fetchSubreddits();
    navigate("/");
  }
  return !token ? (
    <h2>Please login to post</h2>
  ) : (
    <div>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-box">
          <label htmlFor="selectSubreddit">Select Subreddit:</label>
          <select
            className="form-control"
            onChange={(e) => setSelectSubreddit(e.target.value)}
            value={selectSubreddit}
          >
            <option value="">Select a Subreddit</option>
            {subreddits.map((_subreddit) => (
              <option key={_subreddit.id} value={_subreddit.id}>
                {_subreddit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-box">
          <input
            className="input-control"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />
        </div>
        <div className="form-box">
          <textarea
            className="textarea-control"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Text"
          />
        </div>
        <div className="form-box">
          <button className="btn-submit">Post</button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
