import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface TodosFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, TodosFormInput, unknown>;
  defaultInputData?: TodosFormInput;
}

export type TodosFormInput = {
  todo: string;
  completed: boolean;
  userId: number;
};

const TodosForm: React.FC<TodosFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TodosFormInput>();

  useEffect(() => {
    if (props.defaultInputData) {
      setValue("todo", props.defaultInputData.todo);
      setValue("completed", props.defaultInputData.completed);
      setValue("userId", props.defaultInputData.userId);
    }
  }, [props.defaultInputData, setValue]);

  const onSubmit: SubmitHandler<TodosFormInput> = (data) => {
    if (props.isEdit) {
      if (!confirm("Are you sure you want to update this todo?")) {
        return;
      }
    }
    props.mutateFn(data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {props.isEdit ? "Edit Todo" : "Add Todo"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("todo", { required: "Todo is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter todo title"
            />
            {errors.todo && <p className="text-red-500 text-sm">{errors.todo.message}</p>}
          </div>

            {/* User ID Input  */}
            <div>
            <label className="block font-medium mb-1">User ID</label>
            <input
              type="number"
              {...register("userId", { required: "User ID is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter user ID"
            />
            {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
          </div>

          {/* Checkbox Completed */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("completed")}
              className="mr-2 h-5 w-5"
            />
            <label className="text-gray-700 font-medium">Completed</label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 text-white font-bold rounded-md transition ${
                props.isEdit
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-green-500 hover:bg-green-700"
              }`}
            >
              {props.isEdit ? "Save Todo" : "Add Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodosForm;
