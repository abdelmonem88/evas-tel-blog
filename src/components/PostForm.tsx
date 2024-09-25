import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { createPost, updatePost } from "../api/posts";

type PostFormProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  currentPost?: Post | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>;
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
  currentPost,
  setCurrentPost,
}: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      toast.success("Post created successfully");
      setPosts([newPost as Post, ...posts]);
      resetForm();
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Error creating post");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: Post }) =>
      updatePost(id, post),
    onSuccess: (updatedPost) => {
      toast.success("Post updated successfully");
      setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      resetForm();
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Error updating post");
    },
  });

  const resetForm = () => {
    reset();
    setIsEditing(false);
    setCurrentPost(null);
  };

  useEffect(() => {
    if (currentPost) {
      setValue("title", currentPost.title);
      setValue("body", currentPost.body);
    }
  }, [currentPost, setValue]);

  // Handle form submission
  const onSubmit = (formData: Post) => {
    if (isEditing && currentPost) {
      updateMutation.mutate({ id: currentPost.id!, post: formData });
    } else {
      const newPost = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...formData,
      };
      createMutation.mutate(newPost);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form_heading text-2xl font-bold text-[#FFF0D1] mb-4 text-center">
          {isEditing ? "Edit Post" : "Create Post"}
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
        >
          {isEditing ? "Save" : "Submit"} {/* Switch between Submit and Save */}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
