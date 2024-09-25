import React, { useState } from "react";

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border p-4 mb-4 bg-[#795757] rounded flex justify-between">
      <div className="post_content">
        <h2 className="mb-2 text-xl font-bold text-[#FFF0D1]">{post.title}</h2>
        <p>{expanded ? post.body : `${post.body.substring(0, 100)}...`}</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#FFF0D1] bg-[#3b3030] p-2 rounded mt-2"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center actions-btns">
        <button className="text-[#FFF0D1] bg-[#3b3030] p-2 rounded  w-20">
          Edit
        </button>
        <button className="text-[#FFF0D1] bg-[#3b3030] p-2 rounded mt-2 w-20">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
