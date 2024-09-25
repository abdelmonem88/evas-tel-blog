import { useState, useEffect } from "react";

import BlogHeader from "./components/BlogHeader";
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <BlogHeader search={search} handleSearch={handleSearch} />
      <div className="flex flex-col gap-4 p-4 sm:flex-row-reverse">
        <div className="w-full sm:w-1/4">
          <PostForm
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            posts={posts}
            setPosts={setPosts}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
          />
        </div>
        <div
          className="w-full overflow-y-scroll sm:w-3/4"
          style={{ maxHeight: "calc(100vh - 108px)" }}
        >
          <PostsList
            search={debouncedSearch}
            posts={posts}
            setPosts={setPosts}
            setCurrentPost={setCurrentPost}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
    </>
  );
}

export default App;
