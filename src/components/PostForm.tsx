import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { createPost } from "../api/posts";
import { useState } from "react";

type PostsFormProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};

const schema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
});

const PostForm = ({
  isEditing,
  setIsEditing,
  posts,
  setPosts,
}: PostsFormProps) => {
  const [post, setPost] = useState<Post>({
    title: "",
    body: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation<unknown, Error, Post>({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created successfully");
      setIsEditing(false);
      setPosts([post, ...posts]);
      reset();
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error("Error creating post");
    },
  });

  const onSubmit = (post: Post) => {
    setPost({
      id: Math.floor(Math.random() * 1000) + 1,
      ...post,
    });
    mutation.mutate(post);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2
          className="form_heading 
        text-2xl font-bold text-[#FFF0D1] mb-4 text-center
        "
        >
          Create Post
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#FFF0D1]"
          >
            Title
          </label>
          <input
            {...register("title")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-[#FFF0D1]"
          >
            Body
          </label>
          <textarea
            {...register("body")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.body && (
            <p className="mt-1 text-xs text-red-500">{errors.body.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-[#FFF0D1] text-[#3b3030] p-2 rounded font-bold"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
