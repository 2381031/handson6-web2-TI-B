import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CommentFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, CommentFormInput, unknown>;
  defaultInputData?: CommentFormInput;
}

export type CommentFormInput = {
  body: string;
  userId: number;
  postId?: number;
};

const CommentForm: React.FC<CommentFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentFormInput>();

  useEffect(() => {
    if (props.defaultInputData) {
      setValue("body", props.defaultInputData.body);
      setValue("userId", props.defaultInputData.userId);
      setValue("postId", props.defaultInputData.postId);
    }
  }, [props.defaultInputData, setValue]);

  const onSubmit: SubmitHandler<CommentFormInput> = (data) => {
    if (props.isEdit) {
      if (!confirm("Are you sure you want to update this comment?")) {
        return;
      }
    }
    props.mutateFn(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-8 text-center">
          {props.isEdit ? "Edit Your Comment" : "Share Your Thoughts"}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* User ID Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">User ID</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                type="number"
                id="userId"
                {...register("userId", { required: "User ID is required." })}
              />
              {errors.userId && <p className="mt-1 text-rose-500 text-xs">{errors.userId.message}</p>}
            </div>

            {/* Post ID Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Post ID</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                type="number"
                id="postId"
                {...register("postId", { required: "Post ID is required." })}
              />
              {errors.postId && <p className="mt-1 text-rose-500 text-xs">{errors.postId.message}</p>}
            </div>

            {/* Comment Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Your Comment</label>
              <textarea
                {...register("body", { required: "Comment is required" })}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ${
                  errors.body ? "border-rose-500" : "border-gray-200"
                }`}
                rows={5}
                placeholder="What's on your mind?"
              ></textarea>
              {errors.body && <p className="mt-1 text-rose-500 text-xs">{errors.body.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg text-white font-semibold shadow-lg transform transition duration-200 hover:scale-[1.02] ${
                props.isEdit
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              }`}
            >
              {props.isEdit ? "Update Comment" : "Post Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
