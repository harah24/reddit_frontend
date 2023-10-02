import { useOutletContext, Link } from "react-router-dom";
import DeleteSubreddits from "./DeleteSubreddits";
import DisplayPosts from "./DisplayPosts";

// display subreddits and posts on the home page
export default function Home() {
  const { subreddits, posts } = useOutletContext();

  return (
    <div className="home-container">
      <div className="posts-container">
        {/* iterate through the posts & render each post*/}
        {posts.map((post) => {
          if (!post.parentId) {
            return <DisplayPosts post={post} key={post.id} />;
          }
        })}
      </div>
      <div className="subreddits-container">
        <div className="create-btn">
          <Link to={"/newPosts"}>
            <button className="post-button">Create Post </button>
          </Link>
          <Link to={"/newSubreddits"}>
            <button className="subreddit-btn">Create Community</button>
          </Link>
        </div>
        <h3 className="recent-subreddits">
          <b>Recent Subreddits:</b>
        </h3>
        {/* iterate through the subreddits & render each subreddit*/}
        {subreddits.map((subreddit) => {
          return (
            <div className="subreddit-container" key={subreddit.id}>
              <h4>
                <Link className="link" to={`/subreddit/${subreddit.id}`}>
                  {subreddit.name}
                </Link>
              </h4>
              <DeleteSubreddits subreddit={subreddit} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
