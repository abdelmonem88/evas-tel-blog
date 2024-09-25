import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import PostItem from "./PostItem";

type PostsListProps = {
  search: string;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setIsEditing: (isEditing: boolean) => void;
};

const PostsList = ({
  search,
  posts,
  setPosts,
  setCurrentPost,
  setIsEditing,
}: PostsListProps) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page, ""),
  });

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setPosts(data);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
    }
  }, [data, setPosts, page]);

  useEffect(() => {
    setPage(1);
    refetch();
  }, [search, refetch]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

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

  if (filteredPosts.length === 0 && !isLoading)
    return (
      <p className="text-center text-2xl font-bold text-[#FFF0D1]">
        No posts match your search
      </p>
    );

  return (
    <div className="grid gap-4">
      {filteredPosts.map((post: Post) => (
        <PostItem
          key={post.id}
          post={post}
          setPosts={setPosts}
          setCurrentPost={setCurrentPost}
          setIsEditing={setIsEditing}
        />
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
