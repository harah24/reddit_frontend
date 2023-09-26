import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { API } from "./api";

export default function App() {
  // this usestate is globally available
  const [subreddits, setSubreddits] = useState([
    { id: 1, name: "Crypto" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Technology" },
  ]);

  // to login frontend user token has to be stored in a state
  const [token, setToken] = useState("");

  // 3b userinfo stored in state
  const [user, setUser] = useState({});

  // does all this work
  // console.log(user);

  // step 3 to log client in - to get user info now that we have the token stored in state - so create a fetchUser function
  async function fetchUser() {
    // grab token in localstorage - if there is local token then set the state token (setToken) to the local token
    const localToken = localStorage.getItem("token");
    // console.log(localToken);

    if (localToken) {
      setToken(localToken);
    }

    // can't ask for a user if there isn't a token so return and shut it down
    if (!token) {
      return;
    }

    const res = await fetch(`${API}/users/token`, {
      headers: {
        // inject users specific token
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    // console.log(info);
    // 3b. user info stored in state  if info.success is true to update state of user w/ info we want we should setUser(info.user)
    if (info.success) {
      setUser(info.user);
    }
  }
  // console.log(token);

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <div>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <Outlet context={{ subreddits, setToken }} />
      App
    </div>
  );
}
