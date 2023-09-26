import { Link, useOutletContext } from "react-router-dom";

export default function Subreddits() {
  // destructure subreddits from useoutletcontext can get access to subreddits
  const { subreddits } = useOutletContext();
  // console.log(subreddits);
  return (
    <div>
      {/* display a list of the subreddit names by mapping through them */}
      {subreddits.map((subreddit) => {
        return (
          <div key={subreddit.id}>
            <Link to={`/subreddits/${subreddit.id}`}>{subreddit.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
