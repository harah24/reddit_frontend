import { useOutletContext } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { API } from "../api";

export default function Votes({ post }) {
  const { token, fetchPosts } = useOutletContext();

  async function handleUpVote() {
    const res = await fetch(`${API}/votes/upvotes/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
    if (!info.success) {
      delUpVote();
    }
  }

  async function handleDownVote() {
    const res = await fetch(`${API}/votes/downvotes/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
    if (!info.success) {
      delDownVote();
    }
  }

  async function delUpVote() {
    const res = await fetch(`${API}/votes/upvotes/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
  }

  async function delDownVote() {
    const res = await fetch(`${API}/votes/downvotes/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
  }

  return !token ? (
    <></>
  ) : (
    <>
      <button
        onClick={() => {
          handleUpVote();
          delDownVote();
        }}
      >
        <FaArrowUp />
      </button>
      {post.upvotes &&
        post.downvotes &&
        post.upvotes.length - post.downvotes.length}
      <button
        onClick={() => {
          handleDownVote();
          delUpVote();
        }}
      >
        <FaArrowDown />
      </button>
    </>
  );
}
