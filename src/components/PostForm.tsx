import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createPost } from "../api/posts";

const schema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
});

const PostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (post: post) => {
    try {
      await createPost(post);
      alert("Post created successfully");
    } catch (error) {
      console.log(error);
      alert("Error creating post");
    }
  };

  return (
    <div className="w-1/4 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register("title")} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>Body</label>
          <textarea {...register("body")} />
          {errors.body && <p>{errors.body.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
