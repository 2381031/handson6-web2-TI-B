import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PostFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, PostFormInput, unknown>;
  defaultInputData?: PostFormInput;
}

export type PostFormInput = {
  title: string;
  body: string;
  tags: string[];
  userId: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
};

const PostForm: React.FC<PostFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<PostFormInput>();

  useEffect(() => {
    if (props.defaultInputData) {
      setValue("title", props.defaultInputData.title);
      setValue("body", props.defaultInputData.body);
      setValue("tags", props.defaultInputData.tags);
      setValue("userId", props.defaultInputData.userId);
    }
  }, [props.defaultInputData, setValue]);

  const onSubmit: SubmitHandler<PostFormInput> = (data) => {
    if (props.isEdit) {
      if (!confirm("Are you sure you want to update the post?")) {
        return;
      }
    }
    props.mutateFn(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <h2 className="text-lg font-bold mb-4 text-center">
          {props.isEdit ? "Edit Post" : "Add Post"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-medium mb-1">User ID</label>
            <input
              type="number"
              {...register("userId", { required: "User ID is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter user ID"
            />
            {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter post title"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Body</label>
            <textarea
              {...register("body", { required: "Body is required" })}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Enter post content"
            ></textarea>
            {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Tags</label>
            <input
              type="text"
              {...register("tags", { required: "Tags are required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter tags, separated by commas"
            />
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
