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
      <Link to={"/"}>Home</Link>
      <Link to={"/subreddits"}>Subreddits</Link>
      {!user.id && (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
      )}
      {user.id && (
        <>
          <span>Welcome {user.username}</span>
          <Link onClick={handleLogout} to={"/"}>
            Logout
          </Link>
        </>
      )}
    </div>
  );
}
