import { FaPencilAlt } from "react-icons/fa";
import { useOutletContext, Link } from "react-router-dom";

export default function Home() {
  const { subreddits, posts } = useOutletContext();

  return (
    <div className="home-container">
      <div className="subreddits-container">
        <Link to={"/newSubreddits"}>
          <button>Create Subreddit</button>
        </Link>
        {subreddits.map((subreddit) => {
          return (
            <div className="subreddit-container" key={subreddit.id}>
              <h4>
                <Link to={`/subreddit/${subreddit.id}`}>{subreddit.name}</Link>
              </h4>
            </div>
          );
        })}
      </div>
      <div className="posts-container">
        <div className="post-btn">
          <Link to={"/newPosts"}>
            <button>Create Post </button>
          </Link>
        </div>
        {posts.map((post) => (
          <div className="post-container" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <p>Posted by {post.user.username}</p>
            <Link to={`/editPosts/${post.id}`}>
              <button>
                <FaPencilAlt />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
