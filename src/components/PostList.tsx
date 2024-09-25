import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api/posts";
import PostItem from "./PostItem";

type PosteListProps = {
  search: string;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const PostsList = ({ search, posts, setPosts }: PosteListProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", search, page],
    queryFn: () => getPosts(page, search),
  });

  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
    }
  }, [data, setPosts]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && page === 1)
    return (
      <p className="text-center text-2xl font-bold text-[#FFF0D1]">
        Loading...
      </p>
    );

  if (error) return <p>Error fetching posts</p>;

  if (posts.length === 0 && !isLoading)
    return (
      <p className="text-center text-2xl font-bold text-[#FFF0D1]">
        No posts match your search
      </p>
    );

  return (
    <div className="grid gap-4">
      {posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <button
        onClick={loadMorePosts}
        className="p-2 mt-4 text-[#3b3030] bg-[#FFF0D1] -500 rounded font-bold"
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default PostsList;
