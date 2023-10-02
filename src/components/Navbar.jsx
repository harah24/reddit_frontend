import { FaReddit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar({ user, setToken, setUser }) {
  // console.log(user);

  function handleLogout() {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
  }

  return (
    <div className="navbar-container">
      <div className="logo">
        <FaReddit className="reddit" />
        <p className="reddit-word">reddit</p>
      </div>
      <Link className="link" to={"/"}>
        Home
      </Link>
      {/* <Link to={"/newSubreddits"}>New Subreddits</Link>
      <Link to={"/newPosts"}>New Posts</Link> */}
      {/* <Link to={"/editPosts/:postId"}>Edit Post</Link> */}
      {/* <Link to={"/subreddit"}>Subreddit</Link> */}
      {!user.id && (
        <>
          <Link className="link" to={"/login"}>
            Login
          </Link>
          <Link className="link" to={"/register"}>
            Register
          </Link>
        </>
      )}
      {user.id && (
        <>
          <span className="link">Welcome {user.username}</span>
          <Link className="link" onClick={handleLogout} to={"/"}>
            Logout
          </Link>
        </>
      )}
    </div>
  );
}
