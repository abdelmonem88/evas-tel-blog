import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api/posts";

const PostsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"], // Wrap the string value in an array
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts</p>;

  return (
    <div className="grid gap-4">
      {data.map((post: post) => (
        <div key={post.id} className="p-4 border rounded-md">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.body.slice(0, 100)}...</p>
          <button className="text-blue-500">Read More</button>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
