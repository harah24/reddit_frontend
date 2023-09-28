import { useOutletContext, useParams } from "react-router-dom";

export default function Subreddit() {
  const { subreddits, posts, fetchPosts, token, user } = useOutletContext();

  console.log(posts);

  const { subredditId } = useParams();

  const subredditPosts = posts.filter(
    (_post) => _post.subredditId === subredditId
  );
  console.log(subredditPosts);
  return (
    <div>
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
