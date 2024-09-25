import api from "./index";

export const getPosts = async (page: number, search: string) => {
  const response = await api.get("/posts", {
    params: {
      _page: page,
      _limit: 10,
      q: search,
    },
  });
  return response.data;
};

export const getPost = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Post) => {
  const response = await api.post("/posts", post);
  return response.data;
};

export const updatePost = async (id: number, post: Post) => {
  const response = await api.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
