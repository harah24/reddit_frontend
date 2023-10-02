import { FaComment, FaPencilAlt } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import Votes from "./Votes";
import DeletePost from "./DeletePost";
import { useEffect } from "react";
useEffect;

export default function DisplayPosts({ post }) {
  const { user } = useOutletContext();

  return (
    <div className="post-container" key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <p>
        <strong>Posted by</strong> {post.user && post.user.username}
      </p>
      <div className="icon-container">
        {/* check logged user id matches the post.userId & if true allow user to edit */}
        {user.id === post.userId && (
          <Link to={`/editPosts/${post.id}`}>
            <button>
              <FaPencilAlt />
            </button>
          </Link>
        )}
        <DeletePost post={post} />
        <Votes post={post} />
      </div>
      {/* display existing child posts - map through post.children & recursively render this component for each child post */}
      <div className="child-div">
        {post.children &&
          post.children.map((child) => {
            return (
              <DisplayPosts
                post={child}
                key={child.id}
                text={child.text}
                children={child.children}
                username={child.username}
              />
            );
          })}
      </div>
    </div>
  );
}
