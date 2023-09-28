import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NewPosts from "./components/NewPosts.jsx";
import NewSubreddits from "./components/NewSubreddits.jsx";
import EditPost from "./components/EditPost.jsx";
import Subreddit from "./components/Subreddit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "newSubreddits", element: <NewSubreddits /> },
      { path: "newPosts", element: <NewPosts /> },
      { path: "editPosts/:postId", element: <EditPost /> },
      { path: "subreddit/:subredditId", element: <Subreddit /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
