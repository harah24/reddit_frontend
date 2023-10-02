import { useState } from "react";
import { API } from "../api";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function NewSubreddits() {
  const { token, fetchSubreddits } = useOutletContext();
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();

    const res = await fetch(`${API}/subreddits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    setName("");
    fetchSubreddits();
    navigate("/");
  }

  return !token ? (
    <h2>Please login to create a community</h2>
  ) : (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="">Subreddit Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Create Subreddit"
          />
        </div>
        <div>
          <button>Post</button>
        </div>
        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
}
