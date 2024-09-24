import React, { useState } from "react";

const PostItem: React.FC<{ post: post }> = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{expanded ? post.body : `${post.body.substring(0, 100)}...`}</p>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

export default PostItem;
