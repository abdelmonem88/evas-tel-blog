import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BlogHeader from "./components/BlogHeader";
import PostsList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);

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
          />
        </div>
        <div
          className="w-full overflow-y-scroll sm:w-3/4"
          style={{ maxHeight: "calc(100vh - 108px)" }}
        >
          <PostsList search={search} posts={posts} setPosts={setPosts} />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
