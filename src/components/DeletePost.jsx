import { FaTrashAlt } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function DeletePost({ post }) {
  const { token, fetchPosts, user } = useOutletContext();

  async function handleDeletePost() {
    const res = await fetch(`${API}/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    console.log(info);

    fetchPosts();
  }

  return (
    user.id === post.userId && (
      <>
        <button onClick={handleDeletePost}>
          <FaTrashAlt />
        </button>
      </>
    )
  );
}
