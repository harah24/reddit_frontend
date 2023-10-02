import { Outlet, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { API } from "./api";

export default function App() {
  const [subreddits, setSubreddits] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  // fetch user info
  async function fetchUser() {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      setToken(localToken);
    }

    if (!token) {
      return;
    }

    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    if (info.success) {
      setUser(info.user);
    }
  }

  // fetch all subreddits
  async function fetchSubreddits() {
    const res = await fetch(`${API}/subreddits`);

    const info = await res.json();

    if (info.success) {
      setSubreddits(info.subreddits);
    }
  }

  //fetch all the posts
  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);

    const info = await res.json();

    if (info.success) {
      setPosts(info.posts);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchSubreddits();
    fetchPosts();
  }, [token]);

  return (
    <div>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <Outlet
        context={{
          subreddits,
          fetchSubreddits,
          setToken,
          token,
          posts,
          fetchPosts,
          user,
        }}
      />
    </div>
  );
}
