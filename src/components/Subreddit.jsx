import { useOutletContext, useParams } from "react-router-dom";

export default function Subreddit() {
  const { posts } = useOutletContext();

  const { subredditId } = useParams();

  const subredditPosts = posts.filter(
    (_post) => _post.subredditId === subredditId
  );

  return (
    <div className="filter-post">
      {subredditPosts.length > 0 ? (
        subredditPosts.map((post) => (
          <div key={post.id}>
            <h1> {post.title}</h1>
            <p>{post.text}</p>
          </div>
        ))
      ) : (
        <p>No posts found for this subreddit.</p>
      )}
    </div>
  );
}
