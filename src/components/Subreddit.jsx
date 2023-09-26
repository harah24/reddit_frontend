import { useOutletContext, useParams } from "react-router-dom";

export default function Subreddit() {
  const { subreddits } = useOutletContext();

  //subreddits is an array
  // console.log(subreddits);

  // useParams built in react-router-dom used to extract the parameters defined in main.jsx "subreddits/:subredditId"
  // console.log(useParams()) will show an object with the parameters defined
  const { subredditId } = useParams();
  // console.log(subredditId);

  // to find 1 object in the array of objects use filter which returns an array & then grab the first item in the array with index zero [0]
  // data type for filter is callback function
  // parameter of each item as it iterates through = _subreddit
  const subreddit = subreddits.filter((_subreddit) => {
    return _subreddit.id === Number(subredditId);
  })[0];
  // console.log(subreddit);
  return (
    <div>
      <h1>Name: {subreddit.name}</h1>
      <h1>Id: {subreddit.id}</h1>
    </div>
  );
}
