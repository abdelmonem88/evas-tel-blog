import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deletePost } from "../api/posts";

type PostItemProps = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setIsEditing: (isEditing: boolean) => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  setPosts,
  setCurrentPost,
  setIsEditing,
}) => {
  const [expanded, setExpanded] = useState(false);

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
      toast.success("Post deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting post");
    },
  });

  const handleDelete = () => {
    mutation.mutate(post.id!);
  };

  const handleEdit = () => {
    setCurrentPost(post);
    setIsEditing(true);
  };

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
        <button
          onClick={handleEdit}
          className="text-[#FFF0D1] bg-[#3b3030] p-2 rounded  w-20"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-[#FFF0D1] bg-[#3b3030] p-2 rounded mt-2 w-20"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
